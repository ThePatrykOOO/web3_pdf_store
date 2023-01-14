import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@app/db/entities/user/user.service';
import { User } from '@app/db/entities/user/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '@app/db/entities/user/auth/admin.guard';
import { UserRequest } from '@app/utils/interfaces/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const user: User = await this.userService.registerUser(registerDto);
    const token: string = await this.userService.createAuthToken(user);

    return {
      status: 'ok',
      token: token,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user: User = await this.userService.loginUser(loginDto);

    return {
      status: 'ok',
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  @UseGuards(AdminGuard)
  @Get('/me')
  async me(@Req() req: UserRequest): Promise<User> {
    const userId = req?.user?.id;
    return await this.userService.me(userId);
  }
}

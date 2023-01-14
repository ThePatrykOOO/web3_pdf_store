import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@app/db/entities/user/user.service';
import { User } from '@app/db/entities/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

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
}

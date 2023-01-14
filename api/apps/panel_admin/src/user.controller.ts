import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/db/entities/user/user.service';
import { User } from '@app/db/entities/user/user.entity';
import { AdminGuard } from '@app/db/entities/user/auth/admin.guard';
import { UserStoreDto } from './dto/user-store.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@UseGuards(AdminGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async index(): Promise<User[]> {
    return await this.userService.userList();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() userDto: UserStoreDto): Promise<User> {
    return await this.userService.registerUser(userDto, userDto.role);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() userDto: UserUpdateDto,
  ): Promise<void> {
    await this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}

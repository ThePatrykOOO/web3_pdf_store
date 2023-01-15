import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User, UserRole } from '@app/db/entities/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../../../../../apps/panel_admin/src/dto/register.dto';
import { LoginDto } from '../../../../../apps/panel_admin/src/dto/login.dto';
import { UserUpdateDto } from '../../../../../apps/panel_admin/src/dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async userExists(whereClause: { email: string }): Promise<boolean> {
    const users: User = await this.userRepository.findOne({
      where: whereClause,
    });
    return users !== null;
  }

  async sellerExists(id: number): Promise<boolean> {
    const user: User = await this.userRepository.findOne({
      where: {
        id: id,
        role: UserRole.SELLER,
      },
    });
    return user !== null;
  }

  async registerUser(
    registerDto: RegisterDto,
    role: UserRole = UserRole.SELLER,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return await this.userRepository.create({
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      email: registerDto.email,
      password: hashedPassword,
      role: role,
    } as User);
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user: User = await this.findByEmail(loginDto.email);

    const passwordIsSame = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordIsSame) {
      return user;
    }

    throw new NotFoundException(User, 'User not found');
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(User, 'User not found');
    }
    return user;
  }

  async me(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'role',
        'public_address',
      ],
    });
  }

  async userList(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findUserById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id: id },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'role',
        'public_address',
      ],
    });

    if (!user) {
      throw new NotFoundException(User, 'User not found');
    }
    return user;
  }

  async updateUser(id: number, dto: UserUpdateDto): Promise<void> {
    const user: User = await this.findUserById(id);

    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.role = dto.role;
    user.public_address = dto.public_address;
    await user.save();
  }

  async deleteUser(id: number) {
    const user: User = await this.findUserById(id);
    await user.destroy();
  }
}

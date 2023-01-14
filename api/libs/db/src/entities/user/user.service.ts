import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User, UserRole } from '@app/db/entities/user/user.entity';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { RegisterDto } from '../../../../../apps/panel_admin/src/dto/register.dto';
import { LoginDto } from '../../../../../apps/panel_admin/src/dto/login.dto';

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

  async registerUser(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return await this.userRepository.create({
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      email: registerDto.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
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

  async createAuthToken(user: User): Promise<string> {
    const hash = CryptoJS.RC4.encrypt('RC4', user.id, 'user_id').toString();
    await this.cacheManager.set(hash, user.id, 3600);
    return hash;
  }

  async me(userId: string) {
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
}

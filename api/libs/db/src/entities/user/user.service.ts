import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User, UserRole } from '@app/db/entities/user/user.entity';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { RegisterDto } from '../../../../../apps/panel_admin/src/dto/register.dto';

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

  async createAuthToken(user: User): Promise<string> {
    const hash = CryptoJS.RC4.encrypt('RC4', user.id, 'user_id').toString();
    await this.cacheManager.set(hash, user.id, 3600);
    return hash;
  }
}

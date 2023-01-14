import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '@app/db/entities/user/user.service';
import { UserRole } from '@app/db/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ role: UserRole; id: any; email: string }> {
    const user = await this.userService.findByEmail(email);

    const passwordIsSame = await bcrypt.compare(password, user.password);

    if (user && passwordIsSame) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }
}

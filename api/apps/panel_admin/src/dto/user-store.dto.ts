import { RegisterDto } from './register.dto';
import { IsEnum } from 'class-validator';
import { UserRole } from '@app/db/entities/user/user.entity';

export class UserStoreDto extends RegisterDto {
  @IsEnum(UserRole)
  public role: UserRole;
}

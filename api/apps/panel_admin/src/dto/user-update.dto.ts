import { IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from '@app/db/entities/user/user.entity';

export class UserUpdateDto {
  @IsString()
  @Length(3, 255)
  public first_name: string;

  @IsString()
  @Length(3, 255)
  public last_name: string;

  @IsEnum(UserRole)
  public role: UserRole;

  @IsString()
  public public_address: string;
}

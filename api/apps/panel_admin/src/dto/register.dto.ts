import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsEqualTo } from '@app/utils/decorators/is-equal-to.decorator';
import { IsEmailUserAlreadyExist } from '@app/utils/decorators/email-exists.decorator';

export class RegisterDto {
  @IsString()
  @Length(3, 255)
  public first_name: string;

  @IsString()
  @Length(3, 255)
  public last_name: string;

  @IsEmail()
  @Length(3, 255)
  @IsEmailUserAlreadyExist()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

  @IsEqualTo('password', { message: 'Passwords not same' })
  password_repeat: string;
}

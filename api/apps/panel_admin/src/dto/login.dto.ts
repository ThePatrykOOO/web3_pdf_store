import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(3, 255)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;
}

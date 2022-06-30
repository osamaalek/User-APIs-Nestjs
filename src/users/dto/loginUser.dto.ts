import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(7)
  @IsNotEmpty()
  readonly password: string;

}

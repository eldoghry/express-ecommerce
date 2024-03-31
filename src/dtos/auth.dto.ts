import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDto } from "./user.dto";

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

export class RegisterDto extends CreateUserDto {}

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsPhoneNumber("EG")
  phone!: string;

  @IsStrongPassword()
  password!: string;
}

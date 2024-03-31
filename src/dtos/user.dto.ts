import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
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
// export class UpdateUserDto implements Partial<CreateUserDto> {}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber("EG")
  phone?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;
}

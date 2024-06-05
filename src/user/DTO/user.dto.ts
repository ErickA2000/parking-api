import { IsPassword } from "@Decorators/password.decorator";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  idRole: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}

export class UserUpdateDTO {
  idRole?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @IsPassword()
  password?: string;

  @IsString()
  @IsOptional()
  currentPassword?: string;
}

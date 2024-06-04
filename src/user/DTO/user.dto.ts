import { IsPassword } from "@Decorators/password.decorator";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
  name?: string;
  email?: string;
  password?: string;
}

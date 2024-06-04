import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  pass: string;
}

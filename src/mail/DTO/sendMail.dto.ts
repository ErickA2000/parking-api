import { IsPlate } from "@Decorators/plate.decorator";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendMailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPlate()
  plate: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

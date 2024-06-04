import { IsString } from "class-validator";

export class RoleCreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

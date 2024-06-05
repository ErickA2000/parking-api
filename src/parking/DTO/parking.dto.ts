import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ParkingCreateDTO {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  priceHour: number;

  @IsNotEmpty()
  @IsNumber()
  quotas: number;
}

export class ParkingUpdateDTO {
  @IsOptional()
  @IsString()
  idUser?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  priceHour?: number;

  @IsOptional()
  @IsNumber()
  quotas?: number;
}

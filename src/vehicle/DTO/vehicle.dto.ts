import { IsPlate } from "@Decorators/plate.decorator";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class VehicleCreateDTO {
  @IsNotEmpty()
  @IsString()
  idParking: string;

  dateEntry: Date;

  @IsNotEmpty()
  @IsString()
  @IsPlate()
  plate: string;
}

export class VehicleUpdateDTO {
  @IsOptional()
  @IsString()
  idParking?: string;

  dateEntry?: Date;

  @IsOptional()
  @IsString()
  @IsPlate()
  plate?: string;
}

export class VehicleOutParkingDTO {
  @IsNotEmpty()
  @IsString()
  idParking: string;

  @IsNotEmpty()
  @IsString()
  @IsPlate()
  plate: string;
}

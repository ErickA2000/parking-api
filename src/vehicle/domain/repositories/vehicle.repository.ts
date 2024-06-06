import type { BaseRepository } from "@Repositories/base.repository";
import type {
  VehicleCreateDTO,
  VehicleUpdateDTO
} from "@Vehicle/DTO/vehicle.dto";
import type { Vehicle } from "@prisma/client";

export interface VehicleRepository
  extends BaseRepository<VehicleCreateDTO, VehicleUpdateDTO, Vehicle, Vehicle> {
  findAll(idParking?: string): Promise<Vehicle[]>;
  findOneByIdParkingAndPlate(
    idParking: string,
    plate: string
  ): Promise<Vehicle | null>;
}

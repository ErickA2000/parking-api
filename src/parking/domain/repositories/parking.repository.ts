import type { IParking } from "@Interfaces/parking.interface";
import {
  type ParkingCreateDTO,
  type ParkingUpdateDTO
} from "@Parking/DTO/parking.dto";
import type { BaseRepository } from "@Repositories/base.repository";
import type { Parking } from "@prisma/client";

export interface ParkingRepository
  extends BaseRepository<
    ParkingCreateDTO,
    ParkingUpdateDTO,
    Parking,
    IParking
  > {
  findAll(idUser?: string): Promise<IParking[]>;
  findById(id: string, idUser?: string): Promise<IParking | null>;
}

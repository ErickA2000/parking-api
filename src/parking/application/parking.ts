/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { IParking } from "@Interfaces/parking.interface";
import type {
  ParkingCreateDTO,
  ParkingUpdateDTO
} from "@Parking/DTO/parking.dto";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { ParkingRepository } from "@Parking/domain/repositories/parking.repository";
import type { UserApp } from "@User/application/user";
import type { Parking } from "@prisma/client";

export class ParkingApp {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly user: UserApp
  ) {}

  async findAll(roleName: string, idUser?: string): Promise<IParking[]> {
    if (roleName === "socio") {
      return this.parkingRepository.findAll(idUser);
    }
    return this.parkingRepository.findAll();
  }

  async findById(
    id: string,
    idUser: string,
    roleName: string
  ): Promise<IParking> {
    let parking: IParking | null;

    if (roleName === "socio") {
      parking = await this.parkingRepository.findById(id, idUser);
    } else {
      parking = await this.parkingRepository.findById(id);
    }

    if (parking === null) throw new ParkingError({ method: "get" }, id);

    return parking;
  }

  async create(data: ParkingCreateDTO): Promise<Parking> {
    const user = await this.user.findById(data.idUser);

    if (user === null) {
      throw new ParkingError({ method: "create", message: "User not found" });
    }

    return this.parkingRepository.create(data);
  }

  async update(id: string, data: ParkingUpdateDTO): Promise<Parking> {
    if (data.idUser !== undefined) {
      const user = await this.user.findById(data.idUser);

      if (user === null) {
        throw new ParkingError({ method: "update", message: "User not found" });
      }
    }

    return this.parkingRepository.update(id, data);
  }

  async delete(id: string): Promise<Parking> {
    return this.parkingRepository.delete(id);
  }
}

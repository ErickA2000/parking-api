import type {
  HistoryCreateDTO,
  HistoryUpdateDTO
} from "@History/DTO/history.dto";
import { HistoryError } from "@History/domain/errors/history-error";
import type { HistoryRepository } from "@History/domain/repositories/history.repository";
import type {
  Earnings,
  HistoryTop10Vehicles
} from "@Interfaces/history.interface";
import type { ParkingApp } from "@Parking/application/parking";
import type { History, Vehicle } from "@prisma/client";

export class HistoryApp {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly parking: ParkingApp
  ) {}

  async findTop10Vehicles(
    roleName: string,
    idUser: string
  ): Promise<HistoryTop10Vehicles[]> {
    const parking = await this.parking.findAll(roleName, idUser);

    if (parking.length === 0) {
      throw new HistoryError({
        method: "get",
        message: "No associated parking"
      });
    }

    const idsParking = parking.map((parking) => parking.id);

    return await this.historyRepository.findTop10Vehicles(idsParking);
  }

  async findTop10VehiclesOneParking(
    idParking: string,
    roleName: string,
    idUser: string
  ): Promise<HistoryTop10Vehicles[]> {
    if (roleName === "socio") {
      await this.parking.findByIdWithSocio(idParking, idUser);

      return await this.historyRepository.findTop10Vehicles([idParking]);
    }

    return await this.historyRepository.findTop10Vehicles([idParking]);
  }

  async findFirstTimeParked(
    idParking: string,
    roleName: string,
    idUser: string
  ): Promise<Vehicle[]> {
    if (roleName === "socio") {
      await this.parking.findByIdWithSocio(idParking, idUser);

      return await this.historyRepository.findFirstTimeParked(idParking);
    }
    return await this.historyRepository.findFirstTimeParked(idParking);
  }

  async findEarning(idParking: string, idUser: string): Promise<Earnings> {
    await this.parking.findByIdWithSocio(idParking, idUser);

    return await this.historyRepository.findEarnings(idParking);
  }

  async findAll(): Promise<History[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<History | null> {
    throw new Error("Method not implemented.");
  }

  async create(data: HistoryCreateDTO): Promise<History> {
    return await this.historyRepository.create(data);
  }

  async update(id: string, data: HistoryUpdateDTO): Promise<History> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<History> {
    throw new Error("Method not implemented.");
  }
}

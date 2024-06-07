import type { HistoryApp } from "@History/application/history";
import type { PaginateResponse } from "@Interfaces/global.interface";
import type { ParkingApp } from "@Parking/application/parking";
import { compareDatesInHours } from "@Utils/compareDatesInHours";
import type {
  VehicleCreateDTO,
  VehicleOutParkingDTO,
  VehicleUpdateDTO
} from "@Vehicle/DTO/vehicle.dto";
import { VehicleError } from "@Vehicle/domain/errors/vehicle-error";
import type { VehicleRepository } from "@Vehicle/domain/repositories/vehicle.repository";
import type { Vehicle } from "@prisma/client";

export class VehicleApp {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly parking: ParkingApp,
    private readonly history: HistoryApp
  ) {}

  async findAll(
    idParking: string,
    idUser: string,
    roleName: string
  ): Promise<Vehicle[]> {
    if (roleName === "socio") {
      await this.parking.findByIdWithSocio(idParking, idUser);

      return await this.vehicleRepository.findAll(idParking);
    }

    return await this.vehicleRepository.findAll(idParking);
  }

  async findAllPaginate(
    page: number,
    limit: number,
    idParking: string,
    idUser: string,
    roleName: string
  ): Promise<PaginateResponse<Vehicle>> {
    if (roleName === "socio") {
      await this.parking.findByIdWithSocio(idParking, idUser);

      return await this.vehicleRepository.findAllPaginate(
        page,
        limit,
        idParking
      );
    }

    return await this.vehicleRepository.findAllPaginate(page, limit, idParking);
  }

  async search(
    plate: string,
    roleName: string,
    idUser: string
  ): Promise<Vehicle[]> {
    if (roleName === "socio") {
      const parking = await this.parking.findAll(roleName, idUser);

      if (parking.length === 0) {
        throw new VehicleError({
          method: "get",
          message: "No associated parking"
        });
      }

      const idsParking = parking.map((parking) => parking.id);

      return await this.vehicleRepository.search(plate, idsParking);
    }

    return await this.vehicleRepository.search(plate);
  }

  async create(data: VehicleCreateDTO, idUser: string): Promise<Vehicle> {
    const parking = await this.parking.findByIdWithSocio(
      data.idParking,
      idUser
    );

    if (parking._count.Vehicle === parking.quotas) {
      throw new VehicleError({
        method: "create",
        message: "El parqueadero esta lleno"
      });
    }

    return await this.vehicleRepository.create({
      dateEntry: new Date(),
      idParking: data.idParking,
      plate: data.plate
    });
  }

  async update(id: string, data: VehicleUpdateDTO): Promise<Vehicle> {
    throw new Error("Method not implemented.");
    // return this.vehicleRepository.update(id, data);
  }

  async outVehicle(
    data: VehicleOutParkingDTO,
    idUser: string
  ): Promise<Vehicle> {
    await this.parking.findByIdWithSocio(data.idParking, idUser);

    const currentVehicle =
      await this.vehicleRepository.findOneByIdParkingAndPlate(
        data.idParking,
        data.plate
      );

    if (currentVehicle === null) {
      throw new VehicleError({
        method: "get",
        message:
          "No se puede registrar salida, no existe la placa en el parqueadero"
      });
    }

    const currentDate = new Date();
    const hours = compareDatesInHours(currentVehicle.dateEntry, currentDate);

    const amount = hours * currentVehicle.Parking.priceHour;

    await this.history.create({
      idParking: currentVehicle.idParking,
      dateEntry: currentVehicle.dateEntry,
      exitDate: currentDate,
      amount,
      plate: currentVehicle.plate
    });

    return await this.vehicleRepository.delete(currentVehicle.id);
  }

  async delete(id: string): Promise<Vehicle> {
    throw new Error("Method not implemented.");
  }
}

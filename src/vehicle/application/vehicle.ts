import { HistoryApp } from "@History/application/history";
import type { ParkingApp } from "@Parking/application/parking";
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

    return await this.vehicleRepository.create(data);
  }

  async update(id: string, data: VehicleUpdateDTO): Promise<Vehicle> {
    throw new Error("Method not implemented.");
    // return this.vehicleRepository.update(id, data);
  }

  async outVehicle(data: VehicleOutParkingDTO): Promise<Vehicle> {
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
  }

  async delete(id: string): Promise<Vehicle> {
    throw new Error("Method not implemented.");
  }
}

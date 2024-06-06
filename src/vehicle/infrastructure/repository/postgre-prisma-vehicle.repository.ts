import type {
  VehicleCreateDTO,
  VehicleUpdateDTO
} from "@Vehicle/DTO/vehicle.dto";
import type { VehicleRepository } from "@Vehicle/domain/repositories/vehicle.repository";
import type { Vehicle } from "@prisma/client";
import { prisma } from "prisma";

export class PostgrePrismaVehicleRepository implements VehicleRepository {
  async findAll(idParking: string): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: {
        idParking
      }
    });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        id
      }
    });
  }

  async findOneByIdParkingAndPlate(
    idParking: string,
    plate: string
  ): Promise<Vehicle | null> {
    return await prisma.vehicle.findFirst({
      where: {
        idParking,
        plate
      }
    });
  }

  async create(data: VehicleCreateDTO): Promise<Vehicle> {
    return await prisma.vehicle.create({ data });
  }

  async update(id: string, data: VehicleUpdateDTO): Promise<Vehicle> {
    return await prisma.vehicle.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string): Promise<Vehicle> {
    return await prisma.vehicle.delete({
      where: {
        id
      }
    });
  }
}

import type { PaginateResponse } from "@Interfaces/global.interface";
import type { IVehicle } from "@Interfaces/vehicle.interface";
import type {
  VehicleCreateDTO,
  VehicleUpdateDTO
} from "@Vehicle/DTO/vehicle.dto";
import type { VehicleRepository } from "@Vehicle/domain/repositories/vehicle.repository";
import type { Vehicle } from "@prisma/client";
import { paginate, prisma } from "prisma";

export class PostgrePrismaVehicleRepository implements VehicleRepository {
  async findAll(idParking: string): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: {
        idParking
      }
    });
  }

  async findAllPaginate(
    page: number,
    limit: number,
    idParking: string
  ): Promise<PaginateResponse<Vehicle>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await prisma.vehicle.count({
      where: {
        idParking
      }
    });
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const vehicles = await prisma.vehicle.findMany({
      skip: offset,
      take: limit,
      where: {
        idParking
      }
    });

    return paginate<Vehicle>(vehicles, {
      page,
      limit,
      pages,
      count,
      length: vehicles.length
    });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        id
      }
    });
  }

  async findOneByPlate(plate: string): Promise<IVehicle | null> {
    return await prisma.vehicle.findFirst({
      where: {
        plate
      },
      include: {
        Parking: true
      }
    });
  }

  async findOneByIdParkingAndPlate(
    idParking: string,
    plate: string
  ): Promise<IVehicle | null> {
    return await prisma.vehicle.findFirst({
      where: {
        idParking,
        plate
      },
      include: {
        Parking: true
      }
    });
  }

  async search(plate: string, idsParking?: string[]): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: {
        plate: {
          contains: plate
        },
        idParking: {
          in: idsParking
        }
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

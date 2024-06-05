import type { IParking } from "@Interfaces/parking.interface";
import type {
  ParkingCreateDTO,
  ParkingUpdateDTO
} from "@Parking/DTO/parking.dto";
import type { ParkingRepository } from "@Parking/domain/repositories/parking.repository";
import type { Parking } from "@prisma/client";
import { prisma } from "prisma";

export class PostgrePrismaParkingRepository implements ParkingRepository {
  async findAll(idUser?: string): Promise<IParking[]> {
    return await prisma.parking.findMany({
      where: {
        idUser
      },
      include: {
        _count: true,
        Vehicle: true
      }
    });
  }

  async findById(id: string, idUser?: string): Promise<IParking | null> {
    return await prisma.parking.findUnique({
      where: {
        id,
        idUser
      },
      include: {
        Vehicle: true
      }
    });
  }

  async create(data: ParkingCreateDTO): Promise<Parking> {
    return await prisma.parking.create({
      data
    });
  }

  async update(id: string, data: ParkingUpdateDTO): Promise<Parking> {
    return await prisma.parking.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string): Promise<Parking> {
    return await prisma.parking.delete({
      where: {
        id
      }
    });
  }
}

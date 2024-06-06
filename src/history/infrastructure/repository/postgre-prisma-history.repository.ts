import type {
  HistoryCreateDTO,
  HistoryUpdateDTO
} from "@History/DTO/history.dto";
import type { HistoryRepository } from "@History/domain/repositories/history.repository";
import type {
  Earnings,
  HistoryTop10Vehicles
} from "@Interfaces/history.interface";
import type { History, Vehicle } from "@prisma/client";
import { prisma } from "prisma";
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear
} from "date-fns";

export class PostgrePrismaHistoryRepository implements HistoryRepository {
  async findTop10Vehicles(
    idsParking?: string[] | undefined
  ): Promise<HistoryTop10Vehicles[]> {
    const topVehicles = await prisma.history.groupBy({
      by: ["plate"],
      where: {
        idParking: {
          in: idsParking
        }
      },
      _count: {
        plate: true
      },
      orderBy: {
        _count: {
          plate: "desc"
        }
      },
      take: 10
    });

    const plateList = topVehicles.map((vehicle) => vehicle.plate);

    const vehicles = await prisma.history.findMany({
      where: {
        plate: {
          in: plateList
        },
        idParking: {
          in: idsParking
        }
      }
    });

    const result = topVehicles.map((vehicle) => {
      const detail = vehicles.filter((v) => v.plate === vehicle.plate);

      return {
        plate: vehicle.plate,
        count: vehicle._count.plate,
        dateEntry: detail[0].dateEntry,
        exitDate: detail[0].exitDate,
        amount: detail[0].amount
      };
    });

    return result;
  }

  async findFirstTimeParked(idParking: string): Promise<Vehicle[]> {
    const vehiclesParking = await prisma.vehicle.findMany({
      where: {
        idParking
      }
    });

    const firstTimeParked: Vehicle[] = [];

    for (const vehicle of vehiclesParking) {
      const previousRecord = await prisma.history.findFirst({
        where: {
          idParking,
          plate: vehicle.plate
        }
      });

      if (previousRecord === null) {
        firstTimeParked.push(vehicle);
      }
    }

    return firstTimeParked;
  }

  async findEarnings(idParking: string): Promise<Earnings> {
    const now = new Date();

    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);

    const [todayEarnings, weekEarnings, monthEarnings, yearEarnings] =
      await Promise.all([
        prisma.history.aggregate({
          _sum: {
            amount: true
          },
          where: {
            idParking,
            exitDate: {
              gte: todayStart,
              lte: todayEnd
            }
          }
        }),
        prisma.history.aggregate({
          _sum: {
            amount: true
          },
          where: {
            idParking,
            exitDate: {
              gte: weekStart,
              lte: weekEnd
            }
          }
        }),
        prisma.history.aggregate({
          _sum: {
            amount: true
          },
          where: {
            idParking,
            exitDate: {
              gte: monthStart,
              lte: monthEnd
            }
          }
        }),
        prisma.history.aggregate({
          _sum: {
            amount: true
          },
          where: {
            idParking,
            exitDate: {
              gte: yearStart,
              lte: yearEnd
            }
          }
        })
      ]);

    return {
      today: todayEarnings,
      week: weekEarnings,
      month: monthEarnings,
      year: yearEarnings
    };
  }

  async findAll(): Promise<History[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<History | null> {
    throw new Error("Method not implemented.");
  }

  async create(data: HistoryCreateDTO): Promise<History> {
    return await prisma.history.create({ data });
  }

  async update(id: string, data: HistoryUpdateDTO): Promise<History> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<History> {
    throw new Error("Method not implemented.");
  }
}

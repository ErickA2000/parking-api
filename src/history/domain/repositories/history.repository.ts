import type {
  HistoryCreateDTO,
  HistoryUpdateDTO
} from "@History/DTO/history.dto";
import type {
  Earnings,
  HistoryTop10Vehicles
} from "@Interfaces/history.interface";
import type { BaseRepository } from "@Repositories/base.repository";
import type { History, Vehicle } from "@prisma/client";

export interface HistoryRepository
  extends BaseRepository<HistoryCreateDTO, HistoryUpdateDTO, History, History> {
  findTop10Vehicles(idsParking?: string[]): Promise<HistoryTop10Vehicles[]>;
  findFirstTimeParked(idParking: string): Promise<Vehicle[]>;
  findEarnings(idParking: string): Promise<Earnings>;
}

import type {
  HistoryCreateDTO,
  HistoryUpdateDTO
} from "@History/DTO/history.dto";
import type { HistoryRepository } from "@History/domain/repositories/history.repository";
import type { History } from "@prisma/client";

export class HistoryApp {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async findAll(): Promise<History[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<History | null> {
    throw new Error("Method not implemented.");
  }

  async create(data: HistoryCreateDTO): Promise<History> {
    return this.historyRepository.create(data);
  }

  async update(id: string, data: HistoryUpdateDTO): Promise<History> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<History> {
    throw new Error("Method not implemented.");
  }
}

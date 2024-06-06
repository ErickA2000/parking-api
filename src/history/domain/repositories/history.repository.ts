import type {
  HistoryCreateDTO,
  HistoryUpdateDTO
} from "@History/DTO/history.dto";
import type { BaseRepository } from "@Repositories/base.repository";
import type { History } from "@prisma/client";

export interface HistoryRepository
  extends BaseRepository<
    HistoryCreateDTO,
    HistoryUpdateDTO,
    History,
    History
  > {}

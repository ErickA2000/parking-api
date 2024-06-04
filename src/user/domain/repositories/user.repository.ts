import type { BaseRepository } from "@Repositories/base.repository";
import type { User } from "@prisma/client";
import type { UserCreateDTO, UserUpdateDTO } from "@User/DTO/user.dto";
import type { PaginateResponse } from "interfaces/global.interface";

export interface UserRepository
  extends BaseRepository<UserCreateDTO, UserUpdateDTO, User> {
  findAllPaginate(page: number, limit: number): Promise<PaginateResponse<User>>;
  findByEmail(email: string): Promise<User | null>;
}

import type { PaginateResponse } from "@Interfaces/global.interface";
import type { UserCreateDTO, UserUpdateDTO } from "@User/DTO/user.dto";
import { UserError } from "@User/domain/errors/user-error";
import type { UserRepository } from "@User/domain/repositories/user.repository";
import type { User } from "@prisma/client";

export class UserApp {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findAllPaginate(
    page: number,
    limit: number
  ): Promise<
    PaginateResponse<{
      id: string;
      idRole: string;
      name: string;
      email: string;
      password: string;
    }>
  > {
    return this.userRepository.findAllPaginate(page, limit);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (user == null) throw new UserError({ method: "get" }, id);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user == null) throw new UserError({ method: "get" }, email);

    return user;
  }

  async create(data: UserCreateDTO): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: string, data: UserUpdateDTO): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}

import type { PaginateResponse } from "@Interfaces/global.interface";
import type { IUser } from "@Interfaces/user.interface";
import type { UserCreateDTO, UserUpdateDTO } from "@User/DTO/user.dto";
import type { UserRepository } from "@User/domain/repositories/user.repository";
import type { User } from "@prisma/client";
import { paginate, prisma } from "prisma";

export class PostgrePrismaUserRepository implements UserRepository {
  async findAll(): Promise<IUser[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        idRole: true,
        Parking: true
      }
    });
  }

  async findAllPaginate(
    page: number,
    limit: number
  ): Promise<PaginateResponse<IUser>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await prisma.user.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        idRole: true,
        Parking: true
      }
    });

    return paginate<IUser>(users, {
      page,
      limit,
      pages,
      count,
      length: users.length
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        name: true,
        idRole: true,
        password: true,
        Parking: true
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email
      }
    });
  }

  async create(data: UserCreateDTO): Promise<User> {
    return await prisma.user.create({ data });
  }

  async update(id: string, data: UserUpdateDTO): Promise<User> {
    return await prisma.user.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: {
        id
      }
    });
  }
}

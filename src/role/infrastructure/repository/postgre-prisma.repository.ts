import type { Role } from "@prisma/client";
import prisma from "prisma";
import type { RoleCreateDTO } from "@Role/DTO/role.dto";
import type { RoleRepository } from "@Role/domain/repositories/role.repository";

export class PostgrePrismaRoleRepository implements RoleRepository {
  async findAll(): Promise<Role[]> {
    return await prisma.role.findMany();
  }

  async findById(id: string): Promise<Role | null> {
    return await prisma.role.findUnique({
      where: { id }
    });
  }

  async create(data: RoleCreateDTO): Promise<Role> {
    return await prisma.role.create({ data });
  }

  async update(id: string, data: RoleCreateDTO): Promise<Role> {
    return await prisma.role.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string): Promise<Role> {
    return await prisma.role.delete({
      where: { id }
    });
  }
}

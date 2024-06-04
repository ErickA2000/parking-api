import type { RoleRepository } from "@Role/domain/repositories/role.repository";
import type { Role } from "@prisma/client";
import { RoleError } from "@Role/domain/errors/role-error";

export class RoleApp {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);

    if (role == null) throw new RoleError({ method: "get" }, id);

    return role;
  }
}

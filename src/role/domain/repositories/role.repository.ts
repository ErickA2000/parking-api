import type { BaseRepository } from "@Repositories/base.repository";
import type { Role } from "@prisma/client";
import type { RoleCreateDTO, RoleUpdateDTO } from "@Role/DTO/role.dto";

export interface RoleRepository
  extends BaseRepository<RoleCreateDTO, RoleUpdateDTO, Role, Role> {}

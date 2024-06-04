import type { BaseRepository } from "@Repositories/base.repository";
import type { Role } from "@prisma/client";
import type { RoleCreateDTO } from "@Role/DTO/role.dto";

export interface RoleRepository extends BaseRepository<RoleCreateDTO, Role> {}

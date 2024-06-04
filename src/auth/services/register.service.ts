/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { hashPassword } from "@Helpers/password";
import type { RoleApp } from "@Role/application/role";
import type { UserCreateDTO } from "@User/DTO/user.dto";
import type { UserApp } from "@User/application/user";
import type { User } from "@prisma/client";

export class RegisterService {
  constructor(
    private readonly user: UserApp,
    private readonly role: RoleApp
  ) {}

  async register(data: UserCreateDTO): Promise<User> {
    const { password, idRole, ...other } = data;

    await this.role.findById(idRole);

    const user = await this.user.create({
      password: await hashPassword(password),
      idRole,
      ...other
    });

    return user;
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { comparePassword, hashPassword } from "@Helpers/password";
import type { PaginateResponse } from "@Interfaces/global.interface";
import type { IUser } from "@Interfaces/user.interface";
import type { UserCreateDTO, UserUpdateDTO } from "@User/DTO/user.dto";
import { UserError } from "@User/domain/errors/user-error";
import type { UserRepository } from "@User/domain/repositories/user.repository";
import type { User } from "@prisma/client";

export class UserApp {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async findAllPaginate(
    page: number,
    limit: number
  ): Promise<PaginateResponse<IUser>> {
    return await this.userRepository.findAllPaginate(page, limit);
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(id);

    if (user == null) throw new UserError({ method: "get" }, id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (user == null) throw new UserError({ method: "get" }, email);

    return user;
  }

  async create(data: UserCreateDTO): Promise<User> {
    return await this.userRepository.create(data);
  }

  async update(
    id: string,
    data: UserUpdateDTO,
    changePass = false
  ): Promise<User> {
    const { password, currentPassword, ...req } = data;

    if (!changePass) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if ((password && !currentPassword) || (!password && currentPassword)) {
        throw new UserError({
          method: "update",
          message: "current or new password has not been sent"
        });
      }
    }

    let hash: string | undefined;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (password && currentPassword) {
      if (password === currentPassword) {
        throw new UserError({
          method: "update",
          message: "matching passwords"
        });
      }

      const user = await this.userRepository.findById(id);

      const isValidPassword = await comparePassword(
        currentPassword,
        user?.password!
      );

      //  @typescript-eslint/strict-boolean-expressions
      if (!isValidPassword) {
        throw new UserError({
          method: "update",
          message: "incorrect current password"
        });
      }

      hash = await hashPassword(password);
    }

    return await this.userRepository.update(id, {
      password: hash,
      ...req
    });
  }

  async delete(id: string): Promise<User> {
    return await this.userRepository.delete(id);
  }
}

/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { UserUpdateDTO } from "@User/DTO/user.dto";
import type { UserApp } from "@User/application/user";
import { UserError } from "@User/domain/errors/user-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";

export class UpdateUserController {
  constructor(private readonly user: UserApp) {}

  async run(req: Request, res: Response) {
    try {
      const data: UserUpdateDTO = req.body;
      const user = await this.user.update(req.user.user as string, {
        name: data.name,
        email: data.email,
        password: data.password,
        currentPassword: data.currentPassword
      });

      const { password, ...dataUser } = user;
      res.status(CODES_HTTP.OK).json({
        success: true,
        data: dataUser
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(CODES_HTTP.CONFLICT).json({
            success: false,
            message: `${error.meta?.target} already registered`
          });
        }
      }

      if (error instanceof UserError) {
        return res.status(error.status).json({
          success: false,
          message: error.message
        });
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { RegisterService } from "@Auth/services/register.service";
import { CODES_HTTP } from "@Constants/global";
import { RoleError } from "@Role/domain/errors/role-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";

export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  async run(req: Request, res: Response) {
    try {
      const user = await this.registerService.register(req.body);

      const { password, ...dataUser } = user;

      res.status(CODES_HTTP.CREATED).json({
        data: dataUser
      });
    } catch (error) {
      if (error instanceof RoleError) {
        return res.status(error.status).json({
          message: error.message
        });
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(CODES_HTTP.CONFLICT).json({
            message: "e-mail already registered"
          });
        }
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

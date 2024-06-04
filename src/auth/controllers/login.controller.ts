/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthError } from "@Auth/errors/auth-errors";
import type { LoginService } from "@Auth/services/login.service";
import { CODES_HTTP } from "@Constants/global";
import { UserError } from "@User/domain/errors/user-error";
import type { Request, Response } from "express";

export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async run(req: Request, res: Response) {
    const { usuario, pass } = req.body;
    try {
      const token = await this.loginService.login(usuario, pass);

      res.status(CODES_HTTP.OK).json({
        access_token: token
      });
    } catch (error) {
      if (error instanceof UserError) {
        return res.status(error.status).json({
          message: error.message
        });
      }

      if (error instanceof AuthError) {
        return res.status(error.status).json({
          message: error.message
        });
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

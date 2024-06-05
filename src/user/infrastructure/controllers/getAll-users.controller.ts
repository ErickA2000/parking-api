/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { UserApp } from "@User/application/user";
import type { Request, Response } from "express";

export class GetAllUserController {
  constructor(private readonly user: UserApp) {}

  async run(req: Request, res: Response) {
    try {
      const users = await this.user.findAll();

      res.status(CODES_HTTP.OK).json({
        data: users
      });
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

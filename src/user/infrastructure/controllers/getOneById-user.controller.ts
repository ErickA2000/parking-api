/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { UserApp } from "@User/application/user";
import { UserError } from "@User/domain/errors/user-error";
import type { Request, Response } from "express";

export class GetOneByIdUserController {
  constructor(private readonly user: UserApp) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.user.findById(id);

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: user
      });
    } catch (error) {
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

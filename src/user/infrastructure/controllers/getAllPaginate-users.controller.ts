/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { UserApp } from "@User/application/user";
import type { Request, Response } from "express";

export class GetAllPaginateUsersController {
  constructor(private readonly user: UserApp) {}

  async run(req: Request, res: Response) {
    const { page: p, limit: l } = req.query;
    const page = p === undefined ? 1 : Number(p);
    const limit = l === undefined ? 10 : Number(l);

    try {
      const users = await this.user.findAllPaginate(page, limit);

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: users
      });
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: error.message
      });
    }
  }
}

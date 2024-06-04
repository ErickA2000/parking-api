import { CODES_HTTP } from "@Constants/global";
import type { RoleApp } from "@Role/application/role";
import type { Request, Response } from "express";

export class GetAllRoleController {
  constructor(private readonly role: RoleApp) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async run(req: Request, res: Response) {
    try {
      const roles = await this.role.findAll();

      res.status(CODES_HTTP.OK).json(roles);
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { revokeToken } from "@Helpers/jwt";
import { extractTokenFromHeader } from "@Middlewares/authentication";
import type { Request, Response } from "express";

export class LogoutController {
  run(req: Request, res: Response) {
    const token = extractTokenFromHeader(req);

    if (token === undefined) {
      return res.status(CODES_HTTP.UNAUTHORIZED).json({
        message: "Token not provided"
      });
    }

    revokeToken(token);

    res.status(CODES_HTTP.OK).json({
      message: "Logged out successfully"
    });
  }
}

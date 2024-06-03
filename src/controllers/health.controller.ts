import type { Request, Response } from "express";
import { CODES_HTTP } from "@Constants/global";

export class HealthController {
  run(re: Request, res: Response): void {
    res.status(CODES_HTTP.OK).json({
      success: true,
      message: "Server running"
    });
  }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { ParkingApp } from "@Parking/application/parking";
import type { Request, Response } from "express";

export class GetAllParkingController {
  constructor(private readonly parking: ParkingApp) {}

  async run(req: Request, res: Response) {
    try {
      const parking = await this.parking.findAll(
        req.user.roleName,
        req.user.user
      );

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: parking
      });
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

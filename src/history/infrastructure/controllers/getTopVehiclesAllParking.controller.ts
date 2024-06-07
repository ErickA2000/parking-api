/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { HistoryApp } from "@History/application/history";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { Request, Response } from "express";

export class GetTopVehiclesAllParkingController {
  constructor(private readonly history: HistoryApp) {}

  async run(req: Request, res: Response) {
    const { roleName, user } = req.user;

    try {
      const vehicles = await this.history.findTop10Vehicles(roleName, user);

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: vehicles
      });
    } catch (error) {
      if (error instanceof ParkingError) {
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

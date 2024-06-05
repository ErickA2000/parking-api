/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { ParkingCreateDTO } from "@Parking/DTO/parking.dto";
import type { ParkingApp } from "@Parking/application/parking";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { Request, Response } from "express";

export class CreateParkingController {
  constructor(private readonly parking: ParkingApp) {}

  async run(req: Request, res: Response) {
    try {
      const data: ParkingCreateDTO = req.body;

      const parking = await this.parking.create(data);

      res.status(CODES_HTTP.CREATED).json({
        success: true,
        data: parking
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

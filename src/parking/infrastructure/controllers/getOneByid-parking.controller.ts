/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { ParkingApp } from "@Parking/application/parking";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { Request, Response } from "express";

export class GetOneByIdParkingController {
  constructor(private readonly parking: ParkingApp) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    const { user, roleName } = req.user;
    try {
      const parking = await this.parking.findById(id, user, roleName);

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: parking
      });
    } catch (error) {
      if (error instanceof ParkingError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

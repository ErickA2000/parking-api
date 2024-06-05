/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { ParkingUpdateDTO } from "@Parking/DTO/parking.dto";
import type { ParkingApp } from "@Parking/application/parking";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";

export class UpdateParkingController {
  constructor(private readonly parking: ParkingApp) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: ParkingUpdateDTO = req.body;
      const parking = await this.parking.update(id, data);

      res.status(CODES_HTTP.OK).json({
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

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(CODES_HTTP.BAD_REQUEST).json({
            success: false,
            message: `Parking does not exist`
          });
        }
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

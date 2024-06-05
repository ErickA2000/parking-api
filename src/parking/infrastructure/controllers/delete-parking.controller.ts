/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { ParkingApp } from "@Parking/application/parking";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";

export class DeleteParkingController {
  constructor(private readonly parking: ParkingApp) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const parking = await this.parking.delete(id);

      res.status(CODES_HTTP.OK).json({
        success: true,
        message: "Parking deleted",
        data: parking
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(CODES_HTTP.NO_FOUND).json({
            success: false,
            message: "Parking does not exist"
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import { VehicleError } from "@Vehicle/domain/errors/vehicle-error";
import type { Request, Response } from "express";

export class SearchByPlateVehicleController {
  constructor(private readonly vehicle: VehicleApp) {}

  async run(req: Request, res: Response) {
    const { search } = req.query;
    if (search === undefined || search === "") {
      return res.status(CODES_HTTP.BAD_REQUEST).json({
        success: false,
        message: "No courage to search"
      });
    }

    const { roleName, user } = req.user;

    try {
      const vehicle = await this.vehicle.search(
        search as string,
        roleName,
        user
      );

      res.status(CODES_HTTP.OK).json({
        success: true,
        data: vehicle
      });
    } catch (error) {
      if (error instanceof ParkingError) {
        return res.status(error.status).json({
          success: false,
          message: error.message
        });
      }

      if (error instanceof VehicleError) {
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

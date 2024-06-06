/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import type { Request, Response } from "express";

export class GetAllPaginateVehicleController {
  constructor(private readonly vehicle: VehicleApp) {}

  async run(req: Request, res: Response) {
    const { page: p, limit: l } = req.query;
    const page = p === undefined ? 1 : Number(p);
    const limit = l === undefined ? 10 : Number(l);

    const { idParking } = req.params;
    const { user, roleName } = req.user;
    try {
      const vehicles = await this.vehicle.findAllPaginate(
        page,
        limit,
        idParking,
        user,
        roleName
      );

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

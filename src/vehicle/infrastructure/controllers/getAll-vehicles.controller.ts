/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import type { Request, Response } from "express";

export class GetAllVehiclesController {
  constructor(private readonly vehicle: VehicleApp) {}

  async run(req: Request, res: Response) {
    const { idParking } = req.params;
    const { user, roleName } = req.user;
    try {
      const vehicles = await this.vehicle.findAll(idParking, user, roleName);

      res.status(CODES_HTTP.OK).json(vehicles);
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

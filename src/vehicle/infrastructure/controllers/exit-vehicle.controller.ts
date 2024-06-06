/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { VehicleOutParkingDTO } from "@Vehicle/DTO/vehicle.dto";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import { VehicleError } from "@Vehicle/domain/errors/vehicle-error";
import type { Request, Response } from "express";

export class ExitVehicleController {
  constructor(private readonly vehicle: VehicleApp) {}

  async run(req: Request, res: Response) {
    try {
      const { user } = req.user;
      const data: VehicleOutParkingDTO = req.body;
      await this.vehicle.outVehicle(data, user);

      res.status(CODES_HTTP.OK).json({
        message: "Salida registrada"
      });
    } catch (error) {
      if (error instanceof VehicleError) {
        return res.status(error.status).json({
          message: error.message
        });
      }

      if (error instanceof ParkingError) {
        return res.status(error.status).json({
          message: error.message
        });
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

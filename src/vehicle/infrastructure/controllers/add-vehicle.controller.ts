/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { ParkingError } from "@Parking/domain/errors/parking-error";
import type { VehicleCreateDTO } from "@Vehicle/DTO/vehicle.dto";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import { VehicleError } from "@Vehicle/domain/errors/vehicle-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";

export class AddVehicleController {
  constructor(private readonly vehicle: VehicleApp) {}

  async run(req: Request, res: Response) {
    try {
      const data: VehicleCreateDTO = req.body;
      const { user } = req.user;

      const vehicle = await this.vehicle.create(data, user);

      res.status(CODES_HTTP.CREATED).json(vehicle);
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

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(CODES_HTTP.CONFLICT).json({
            message:
              "No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero"
          });
        }
      }

      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

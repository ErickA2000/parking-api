import type { Parking, Vehicle } from "@prisma/client";

export interface IParking extends Parking {
  _count: {
    Vehicle: number;
    History: number;
  };
  Vehicle: IVehicle[];
}

interface IVehicle extends Vehicle {}

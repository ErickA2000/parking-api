import type { Parking, Vehicle } from "@prisma/client";

export interface IParking extends Parking {
  Vehicle: IVehicle[];
}

interface IVehicle extends Vehicle {
  _count?: number;
}

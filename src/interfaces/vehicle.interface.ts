import type { Parking, Vehicle } from "@prisma/client";

export interface IVehicle extends Vehicle {
  Parking: Parking;
}

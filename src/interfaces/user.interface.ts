import type { Parking } from "@prisma/client";

export interface IUser {
  id: string;
  idRole: string;
  name: string;
  email: string;
  password?: string;
  Parking: Parking[];
}

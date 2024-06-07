/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { SendMailDTO } from "@Mail/DTO/sendMail.dto";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import { mailApi } from "config";
import fetch, { type Response } from "node-fetch";

export class MailService {
  constructor(private readonly vehicle: VehicleApp) {}

  async send(data: SendMailDTO): Promise<string> {
    const vehicle = await this.vehicle.findOneByPlate(data.plate);

    const bodyMail = {
      email: data.email,
      plate: data.plate,
      message: data.message,
      parkingName: vehicle.Parking.name
    };

    const url = mailApi() + "/api/v1/mail";
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyMail)
    });

    if (!response.ok) {
      throw new Error(`Request error ${response.statusText}`);
    }

    const responseData = (await response.json()) as ResponseData;

    return responseData.message;
  }
}

interface ResponseData {
  message: string;
}

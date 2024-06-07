/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { SendMailDTO } from "@Mail/DTO/sendMail.dto";
import type { VehicleApp } from "@Vehicle/application/vehicle";
import { mailApi } from "config";
import axios from "axios";

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
    const response = await axios(url, {
      data: bodyMail,
      method: "POST"
    });

    const responseData = response.data as ResponseData;

    return responseData.message;
  }
}

interface ResponseData {
  message: string;
}

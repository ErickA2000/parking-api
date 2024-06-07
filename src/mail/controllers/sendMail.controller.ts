/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import type { SendMailDTO } from "@Mail/DTO/sendMail.dto";
import type { MailService } from "@Mail/services/sendMail.service";
import { VehicleError } from "@Vehicle/domain/errors/vehicle-error";
import type { Request, Response } from "express";

export class SendMailController {
  constructor(private readonly mailService: MailService) {}

  async run(req: Request, res: Response) {
    const data: SendMailDTO = req.body;

    try {
      const sentMail = await this.mailService.send(data);

      res.status(CODES_HTTP.OK).json({
        message: sentMail
      });
    } catch (error) {
      if (error instanceof VehicleError) {
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

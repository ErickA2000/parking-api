import { vehicle } from "@Vehicle/infrastructure/dependencias";
import { MailService } from "./services/sendMail.service";
import { SendMailController } from "./controllers/sendMail.controller";

export const mailService = new MailService(vehicle);

//* controllers
export const sendMailController = new SendMailController(mailService);

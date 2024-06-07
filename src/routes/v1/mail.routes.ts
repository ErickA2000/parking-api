/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { SendMailDTO } from "@Mail/DTO/sendMail.dto";
import { sendMailController } from "@Mail/dependencies";
import { authentication } from "@Middlewares/index";
import { validateDTO } from "@Middlewares/validateDTO";
import { Router } from "express";

class MailRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/",
      [
        authentication.tokenValidation,
        authentication.isAdmin,
        validateDTO(SendMailDTO)
      ],
      sendMailController.run.bind(sendMailController)
    );
  }
}

const mailRouter = new MailRouter();
export default mailRouter.router;

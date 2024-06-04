/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { LoginDTO } from "@Auth/DTO/auth.dto";
import { loginController } from "@Auth/dependencies";
import { validateDTO } from "@Middlewares/validateDTO";
import { Router } from "express";

class AuthRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/login",
      [validateDTO(LoginDTO)],
      loginController.run.bind(loginController)
    );
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;

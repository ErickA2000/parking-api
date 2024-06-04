/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { LoginDTO } from "@Auth/DTO/auth.dto";
import { loginController, registerController } from "@Auth/dependencies";
import { authentication } from "@Middlewares/index";
import { validateDTO } from "@Middlewares/validateDTO";
import { UserCreateDTO } from "@User/DTO/user.dto";
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
    this.router.post(
      "/register",
      [
        authentication.tokenValidation,
        authentication.isAdmin,
        validateDTO(UserCreateDTO)
      ],
      registerController.run.bind(registerController)
    );
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;

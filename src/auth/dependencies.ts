import { user } from "@User/infrastructure/dependencies";
import { LoginService } from "./services/login.service";
import { LoginController } from "./controllers/login.controller";

const loginService = new LoginService(user);

export const loginController = new LoginController(loginService);

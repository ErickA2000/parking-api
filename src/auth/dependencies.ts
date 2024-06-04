import { user } from "@User/infrastructure/dependencies";
import { LoginService } from "./services/login.service";
import { LoginController } from "./controllers/login.controller";
import { RegisterService } from "./services/register.service";
import { role } from "@Role/infrastructure/dependencies";
import { RegisterController } from "./controllers/register.controller";

//* Services
const loginService = new LoginService(user);
const registerService = new RegisterService(user, role);

//* Controllers
export const loginController = new LoginController(loginService);
export const registerController = new RegisterController(registerService);

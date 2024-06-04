import { getAllRoleController } from "@Role/infrastructure/dependencies";
import { Router } from "express";

class RoleRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/",
      [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      getAllRoleController.run.bind(getAllRoleController)
    );
  }
}

const roleRouter = new RoleRouter();
export default roleRouter.router;

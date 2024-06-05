/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { authentication } from "@Middlewares/index";
import { validateDTO } from "@Middlewares/validateDTO";
import { UserUpdateDTO } from "@User/DTO/user.dto";
import {
  getAllPaginateUsersController,
  getAllUserController,
  getOneByIdUserController,
  getProfileController,
  updateUserController
} from "@User/infrastructure/dependencies";
import { Router } from "express";

class UserRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/",
      [authentication.tokenValidation, authentication.isAdmin],
      getAllUserController.run.bind(getAllUserController)
    );
    this.router.get(
      "/p",
      [authentication.tokenValidation, authentication.isAdmin],
      getAllPaginateUsersController.run.bind(getAllPaginateUsersController)
    );
    this.router.get(
      "/one/:id",
      [authentication.tokenValidation, authentication.isAdmin],
      getOneByIdUserController.run.bind(getOneByIdUserController)
    );
    this.router.get(
      "/profile",
      [authentication.tokenValidation],
      getProfileController.run.bind(getProfileController)
    );
    this.router.patch(
      "/",
      [authentication.tokenValidation, validateDTO(UserUpdateDTO)],
      updateUserController.run.bind(updateUserController)
    );
  }
}

const userRouter = new UserRouter();
export default userRouter.router;

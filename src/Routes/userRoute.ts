import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUsercontroller,
  getAllUserControlller,
  getOneUserControlller,
  loginController
} from "../Controllers/userController";
import passport from "../config/passport";
import authorization from "../middleware/authorization";
import * as  expressValidator from "../middleware/expressValidator";

const routers = Router();

routers.post("/createUser", passport.authenticate('jwt', { session: false }), createUserController);

routers.put("/updateUser/:id", passport.authenticate('jwt', { session: false }), authorization("user"), updateUserController);

routers.delete("/deleteUser/:id", passport.authenticate('jwt', { session: false }), authorization("user"), deleteUsercontroller);

routers.get("/getAllUser", passport.authenticate('jwt', { session: false }), authorization("admin"), getAllUserControlller);

routers.get("/getOneUser/:id", passport.authenticate('jwt', { session: false }), authorization("admin"), getOneUserControlller);

routers.post("/login", [expressValidator.passwordValidation, expressValidator.emailValidation], loginController)

export default routers;

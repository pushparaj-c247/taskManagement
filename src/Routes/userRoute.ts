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

const router = Router();

router.post("/createUser", createUserController);

router.put("/updateUser/:id", passport.authenticate('jwt', { session: false }), authorization("user"), updateUserController);

router.delete("/deleteUser/:id", passport.authenticate('jwt', { session: false }), authorization("user"), deleteUsercontroller);

router.get("/getAllUser", passport.authenticate('jwt', { session: false }), authorization("admin"), getAllUserControlller);

router.get("/getOneUser/:id", passport.authenticate('jwt', { session: false }), authorization("admin"), getOneUserControlller);

router.post("/login", [expressValidator.passwordValidation, expressValidator.emailValidation], loginController)

export default router;

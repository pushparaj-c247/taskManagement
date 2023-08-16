import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUsercontroller,
  getAllUserControlller,
  getOneUserControlller,
  getVerifyController,
  loginController
} from "../Controllers/userController";
import passport from "../config/passport";
const router = Router();

router.post("/createUser", createUserController);

router.put("/updateUser/:id", updateUserController);

router.delete("/deleteUser/:id", deleteUsercontroller);

router.get("/getAllUser", getAllUserControlller);

router.get("/getOneUser/:id", getOneUserControlller);

router.get("/get-verify", passport.authenticate('jwt',{session: false}), getVerifyController)

router.post("/login", loginController)

export default router;

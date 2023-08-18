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
import { body } from 'express-validator';


const router = Router();

router.post("/createUser", createUserController);

router.put("/updateUser/:id", updateUserController);

router.delete("/deleteUser/:id", deleteUsercontroller);

router.get("/getAllUser", passport.authenticate('jwt',{session: false}), authorization("admin"), getAllUserControlller);

router.get("/getOneUser/:id", passport.authenticate('jwt',{session: false}), authorization("admin"), getOneUserControlller);

router.post("/login", body('email').notEmpty(), body('password').notEmpty(), loginController)

export default router;

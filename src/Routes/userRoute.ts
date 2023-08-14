import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUsercontroller,
  getAllUserControlller,
  getOneUserControlller
} from "../Controllers/userController";
const router = Router();

router.post("/createUser", createUserController);

router.put("/updateUser/:id", updateUserController);

router.delete("/deleteUser/:id", deleteUsercontroller);

router.get("/getAllUser", getAllUserControlller);

router.get("/getOneUser/:id", getOneUserControlller);

export default router;

import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUsercontroller,
} from "../Controllers/userController";
const router = Router();

router.post("/createUser", createUserController);

router.put("/updateUser/:id", updateUserController);

router.delete("/deleteUser/:id", deleteUsercontroller);

export default router;

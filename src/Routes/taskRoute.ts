import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
  deleteTaskcontroller,
} from "../Controllers/taskController";
const router = Router();

router.post("/createTask", createTaskController);

router.put("/updateTask/:id", updateTaskController);

router.delete("/deleteTask/:id", deleteTaskcontroller);

export default router;
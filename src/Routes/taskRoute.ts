import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
  deleteTaskcontroller,
  getAllTaskControlller,
  getOneTaskControlller
} from "../Controllers/taskController";
const router = Router();

router.post("/createTask", createTaskController);

router.put("/updateTask/:id", updateTaskController);

router.delete("/deleteTask/:id", deleteTaskcontroller);

router.get("/getOneTask/:id", getOneTaskControlller);

router.get("/getAllTask", getAllTaskControlller);



export default router;

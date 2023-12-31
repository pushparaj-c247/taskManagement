import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
  deleteTaskcontroller,
  getAllTaskControlller,
  getOneTaskControlller,
  getMyAllTaskController,
} from "../Controllers/taskController";
import authorization from "../middleware/authorization";
import passport from "../config/passport";
const router = Router();

router.post("/createTask", passport.authenticate("jwt", { session: false }),
  authorization("admin"), createTaskController);

router.put("/updateTask", passport.authenticate("jwt", { session: false }),authorization("admin"), updateTaskController);

router.delete("/deleteTask", passport.authenticate("jwt", { session: false }),
  authorization("admin"), deleteTaskcontroller);

router.get("/getOneTask/:id", passport.authenticate("jwt", { session: false }),
  authorization("admin"), getOneTaskControlller);

router.get(
  "/getAllTask",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  getAllTaskControlller
);

router.get("/getMyAllTask", passport.authenticate("jwt", { session: false }),
authorization("admin"), getMyAllTaskController);

export default router;

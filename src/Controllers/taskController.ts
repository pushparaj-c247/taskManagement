import { Request, Response } from "express";
import { createTask, updateTask, deleteTask } from "../Services/taskServices";

const createTaskController = (req: Request, res: Response) => {
  const createT = createTask(req.body);
  return res.send(createT);
};

const updateTaskController =  (req: Request, res: Response) => {
  const updateT =  updateTask();
  return res.send(updateT);
};

const deleteTaskcontroller = (req: Request, res: Response) => {
  const deletT = deleteTask(req.params.id);
  return res.send(deletT);
};

export { createTaskController, updateTaskController, deleteTaskcontroller };

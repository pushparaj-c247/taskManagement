import { Request, Response } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getOneTask,
} from "../Services/taskServices";

const createTaskController = (req: Request, res: Response) => {
  const createT = createTask(req.body);
  return res.send(createT);
};

const updateTaskController = (req: Request, res: Response) => {
  const updateT = updateTask(req.params.id, req.body);
  return res.send(updateT);
};

const deleteTaskcontroller = (req: Request, res: Response) => {
  const deletT = deleteTask(req.params.id);
  return res.send(deletT);
};
const getAllTaskControlller = async (req: Request, res: Response) => {
  const alltask = await getAllTask();

  return res.send(alltask);
};
const getOneTaskControlller = async (req: Request, res: Response) => {
  const oneTask = await getOneTask(req.params.id);
  return res.send(oneTask);
};

export {
  createTaskController,
  updateTaskController,
  deleteTaskcontroller,
  getAllTaskControlller,
  getOneTaskControlller,
};

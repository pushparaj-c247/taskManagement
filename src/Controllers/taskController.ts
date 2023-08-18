import { Request, Response, NextFunction } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getOneTask,
  getMyAllTask,
} from "../Services/taskServices";

const createTaskController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createT = createTask(req.body);
    return res.send(createT);
  } catch (error) {
    console.log("Error In CrateTask");
    next(error);
  }
};

const updateTaskController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateT = updateTask(req.params.id, req.body);
    return res.send(updateT);
  } catch (error) {
    console.log("Error In UpdateTask");
    next(error);
  }
};

const deleteTaskcontroller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletT = deleteTask(req.params.id);
    return res.send(deletT);
  } catch (error) {
    console.log("Error In DeleteTask");
    next(error);
  }
};
const getAllTaskControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const alltask = await getAllTask();
    return res.send(alltask);
  } catch (error) {
    console.log("Error In GetAllTask");
    next(error);
  }
};
const getOneTaskControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneTask = await getOneTask(req.params.id);
    return res.send(oneTask);
  } catch (error) {
    console.log("Error In GetOneTask");
    next(error);
  }
};
const getMyAllTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getMyAllTask(req.body);
    return res.send(task);
  } catch (error) {
    console.log("Error In GetMyAllTask");
    next(error);
  }
};

export {
  createTaskController,
  updateTaskController,
  deleteTaskcontroller,
  getAllTaskControlller,
  getOneTaskControlller,
  getMyAllTaskController,
};

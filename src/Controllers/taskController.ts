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
    const id:string  =  req.user!._id
    const createT = createTask(req.body, id);
    return res.send(createT);
  } catch (err) {
    res.status(401).json("Error In CrateTask")
    next(err)
  }
};

const updateTaskController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string  =  req.user!._id
    const updateT = updateTask(req.body, id);
    return res.send(updateT);
  } catch (err) {
    console.log("Error In UpdateTask");
    next(err);
  }
};

const deleteTaskcontroller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string  =  req.user!._id
    const deletT = deleteTask(req.body, id);
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
    const alltask = await getAllTask(req.body, req.query);
    console.log(alltask)
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
    const id: string  =  req.user!._id
    const task = await getMyAllTask(req.body, req.body,id, req.body);
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

import { Request, Response, NextFunction } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser,
  login,
} from "../Services/userServices";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createU = await createUser(req.body);
    return res.send(createU);
  }
  catch (error) {
    console.log("Error In CreateUser");
    next(error);
  }
};

const updateUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateU = updateUser(req.params.id, req.body, req.user);
    return res.send(updateU);
  } catch (error) {
    console.log("Error In UpdateUser");
    next(error);
  }
};

const deleteUsercontroller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletU = deleteUser(req.params.id, req.user);
    return res.send(deletU);
  } catch (error) {
    console.log("Error In DeleteUser");
    next(error);
  }
};

const getAllUserControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUser = await getAllUser(req.body, req.query);
    return res.send(allUser);
  } catch (error) {
    console.log("Error In GetAllUser");
    next(error);
  }
};
const getOneUserControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneUser = await getOneUser(req.params.id);
    return res.send(oneUser);
  } catch (error) {
    console.log("Error In GetOneUser");
    next(error);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await login(req, res);

  }
  catch (error) {
    console.log("Error In LoginUser");
    next(error);
  }
};

export {
  createUserController,
  updateUserController,
  deleteUsercontroller,
  getAllUserControlller,
  getOneUserControlller,
  loginController,
};

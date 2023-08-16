import { Request, Response } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser,
  getVerify,
  login
} from "../Services/userServices";

const createUserController = (req: Request, res: Response) => {
  const createU = createUser(req.body);
  return res.send(createU);
};

const updateUserController = (req: Request, res: Response) => {
  const updateU = updateUser(req.params.id, req.body);
  return res.send(updateU);
};

const deleteUsercontroller = (req: Request, res: Response) => {
  const deletU = deleteUser(req.params.id);
  return res.send(deletU);
};

const getAllUserControlller = async (req: Request, res: Response) => {
  const allUser = await getAllUser();
  return res.send(allUser);
};
const getOneUserControlller = async (req: Request, res: Response) => {
  const oneUser = await getOneUser(req.params.id);
  return res.send(oneUser);
};

const getVerifyController = async (req: Request, res: Response) => {
  const verify = await getVerify(req.body);
  return res.send(verify);
};

const loginController = async (req: Request, res: Response) =>{
  return await login(req, res);
}

export {
  createUserController,
  updateUserController,
  deleteUsercontroller,
  getAllUserControlller,
  getOneUserControlller,
  getVerifyController,
  loginController
};

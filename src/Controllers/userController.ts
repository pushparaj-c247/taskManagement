import { Request, Response } from "express";
import { createUser, updateUser, deleteUser, getAllUser, getOneUser } from "../Services/userServices";


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

const getAllUserControlller = async(req: Request, res: Response) =>{
  const allUser =await getAllUser();
  return res.send(allUser)
}
const getOneUserControlller = async (req:Request, res: Response) =>{
  const oneUser = await getOneUser(req.params.id);
  return res.send(oneUser)
}

export { createUserController, updateUserController, deleteUsercontroller, getAllUserControlller, getOneUserControlller };

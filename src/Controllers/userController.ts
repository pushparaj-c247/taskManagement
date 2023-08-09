import { Request, Response } from "express";
import { createUser, updateUser, deleteUser } from "../Services/userServices";

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

export { createUserController, updateUserController, deleteUsercontroller };

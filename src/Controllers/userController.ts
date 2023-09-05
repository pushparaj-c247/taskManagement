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
  
) => {
  try {
    const createU = await createUser(req.body);
    return res.status(200).send(createU);
  }
  catch (error) {
    console.log(error);
    

  }
};

const updateUserController = (
  req: Request,
  res: Response,

) => {
  try {
    const id :string =  req.user!._id
     updateUser(req.body,id);
    return res.status(200).send("User Is Updated Successfully")
  } catch (error) {
    return res.status(401)
    
  }
};

const deleteUsercontroller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id :string =  req.user!._id
    await deleteUser(id );
    return res.send("User Is Deleted Sucessfully")
  } catch (error) {
    res.send("Error In DeleteUser");
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

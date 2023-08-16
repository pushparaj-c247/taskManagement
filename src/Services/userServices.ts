import userSchema from "../Model/userModel";
import { Request, Response } from "express";
import obj from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { emit } from "process";
const createUser = async (obj: obj) => {
  try {
    obj.password = await bcrypt.hash(obj.password, 10);
    await userSchema.create(obj);
    return "user created";
  } catch (e) {
    console.log(emit);
  }
};
const updateUser = async (id: string, obj: obj) => {
  await userSchema.findByIdAndUpdate(id, {
    $set: { userName: obj.userName, email: obj.email, password: obj.password },
  });
  return " User Is Updated Sucessfully";
};
const deleteUser = async (id: string) => {
  await userSchema.findByIdAndDelete(id);
  return "User Is Deleted Sucessfully";
};

const getAllUser = async () => {
  const all = await userSchema.find();
  return all;
};
const getOneUser = async (usid: string) => {
  const one = await userSchema.findById(usid);
  return one;
};
const getVerify = async (authV: obj): Promise<obj | null> => {
  const result: obj | null = await userSchema.findOne({
    email: authV.email ,
  });

  return result;
};
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const obj: obj | null = await userSchema.findOne({
      email: email,
    });
    if (!obj) {
      return res.status(400).json({
        message: "invalid username & password",
      });
    }

    const passwordMatch = bcrypt.compare(password, obj.password);
    

    if (!passwordMatch) {
      return res.status(400).json({ messge: "invalid username & password" });
    }
    const token = jwt.sign(
      { email: obj.email, name: obj.userName },
      "ABcdefg",
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "logged in successfully", token });
  } catch (e) {
    console.log(e);
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser,
  getVerify,
  login,
};

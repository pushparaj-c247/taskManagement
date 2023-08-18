import userSchema from "../Model/userModel";
import { NextFunction, Request, Response } from "express";
import { obj } from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const createUser = async (obj: obj) => {
  obj.password = await bcrypt.hash(obj.password, 10);
  await userSchema.create(obj);
  return "user created";
};

const updateUser = async (id: string, obj: obj) => {
  await userSchema.findByIdAndUpdate(id, {
    $set: { userName: obj.name, email: obj.email, password: obj.password },
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

const login = async (req: Request, res: Response ) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result["errors"][0] });
  }
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
  const token = jwt.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
    expiresIn: "1h",
  });
  res.json({ message: "logged in successfully", token });
}

export { createUser, updateUser, deleteUser, getAllUser, getOneUser, login };

import userSchema from "../Model/userModel";
import { Request, Response } from "express";
import { obj, sort } from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { filterQuery, queryObject } from "../interfaces/taskInterface";
import { ParsedQs } from "qs"


const createUser = async (obj: obj) => {
  await userSchema.create(obj);
  return "user created";
};

const updateUser = async (id: string, obj: obj, user: any) => {
  const ids = user._id.toString();
  if (id !== ids) {
    return console.log("invalid")
  }
  await userSchema.findByIdAndUpdate(id, {
    userName: obj.name,
    email: obj.email,
    password: obj.password,
  });
  return " User Is Updated Sucessfully";
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteUser = async (id: string, user: any) => {
  const ids = user._id.toString();
  if (id !== ids) {
    return console.log("invalid")
  }
  await userSchema.findByIdAndDelete(id);
  return "User Is Deleted Sucessfully";
};

const getAllUser = async (object: sort, query: ParsedQs) => {
  const colmn = object.columns;
  const num = object.pos;
  let sort = {};
  sort = { colmn: num };
  if (colmn) {
    sort = { [colmn]: num };
  }
  const { search, page, limit } = query;
  const colmns = [
    "name",
    "email",
    "password",
    "role",
  ];
  const filterQuery: filterQuery = { $or: [] };
  if (typeof search == "string") {
    const searchString = search.trim();
    const or: queryObject[] = [];
    colmns.forEach((col) => {
      if (search) {
        or.push({
          [col]: { $regex: `.*${searchString}.*`, $options: "i" },
        });

      }
    });
    filterQuery.$or = or;

  }
  const all = userSchema.aggregate([
    {
      $match: filterQuery,
    },
    {
      $project: {
        name: 1,
        email: 1,
        password: 1,
        role: 1
      },
    },
    {
      $sort: sort
    }


  ]);
  const respose: object = {};
  const options: object = {
    page,
    limit,
  };

  try {
    const response = await userSchema.aggregatePaginate(all, options);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return respose;

};

const getOneUser = async (usid: string) => {
  const one = await userSchema.findById(usid);
  return one;
};

const login = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result["errors"][0] });
  }
  const { email, password } = req.body;
  const obj: obj | null = await userSchema.findOne({
    email: email,
  });
  if (!obj) {
    return res.status(401).json({
      message: "invalid username & password",
    });
  }

  const passwordMatch = await obj.validatePassword(password);

  if (!passwordMatch) {
    return res.status(401).json({ messge: "invalid password" });
  }
  const token = jwt.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
    expiresIn: "1h",
  });
  res.json({ message: "logged in successfully", token });
};

export { createUser, updateUser, deleteUser, getAllUser, getOneUser, login };

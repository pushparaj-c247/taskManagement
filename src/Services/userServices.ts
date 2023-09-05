import userSchema from "../Model/userModel";
import { Request, Response } from "express";
import { obj, sort } from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { filterQuery, queryObject } from "../interfaces/taskInterface";
import { ParsedQs } from "qs"
import Redis from "ioredis"



const createUser = async (obj: obj) => {
  const create = await userSchema.create(obj);
  return create;
};

const updateUser = async (obj: obj, _id: string) => {
  const ids = _id
  await userSchema.findByIdAndUpdate(ids, {
    userName: obj.name,
    email: obj.email,
    password: obj.password,
  });
  return "User Is Updated Successfully";
};
const deleteUser = async (_id: string) => {
  const ids = _id
  await userSchema.findByIdAndDelete(ids);
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

  const redisclient = new Redis();
  const cachedData = await redisclient.get(`allUser?col${search}?page=${page}?limit${limit}`);
  if (cachedData)
   {return JSON.parse(cachedData) }
   else {
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

  const options: object = {
    page,
    limit,
  };

  const response = await userSchema.aggregatePaginate(all, options);
  redisclient.set(`allUser?col${search}?page=${page}?limit${limit}`,
  JSON.stringify(response))
   return response;
 

}
}

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

  // Password validation using regex pattern
  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // if (!passwordPattern.test(password)) {
  //   return res.status(400).json({
  //     message: "Invalid password format",
  //   });
  // }

  const passwordMatch = await obj.validatePassword(password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "invalid password" });
  }

  const token = jwt.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
    expiresIn: "1h",
  });
  res.json({ message: "logged in successfully", token });
};


export { createUser, updateUser, deleteUser, getAllUser, getOneUser, login };

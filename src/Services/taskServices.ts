import moment from "moment";
import taskSchema from "../Model/taskModel";
import { sort } from "../interfaces/userInterface";
import { objs, queryObject, filterQuery } from "../interfaces/taskInterface"
import mongoose from "mongoose";
import { ParsedQs } from 'qs';
const createTask = (
  obj: objs) => {
  taskSchema.create({
    subject: obj.subject,
    description: obj.description,
    assignedTo: obj.assignedTo,
    assignedBy: obj.assignedBy,
    statusType: obj.statusType,
  });

  return " Task Is Created Sucessfully";
};
const updateTask = async (id: string, obj: objs, user: any) => {
  const ids = user._id.toString();
  if (id !== ids) {
    return console.log("invalid")
  }
  await taskSchema.findByIdAndUpdate(id, {
    $set: {
      subject: obj.subject,
      description: obj.description,
      assignedTo: obj.assignedTo,
      assignedBy: obj.assignedBy,
      statusType: obj.statusType,
    },
  });
  return " Task Is Updated Sucessfully";
};
const deleteTask = async (id: string, user: any) => {
  const ids = user._id.toString();
  if (id !== ids) {
    return console.log("invalid")
  }
  await taskSchema.findByIdAndDelete(id);
  return " Task Is Deleted Sucessfully";
};
const getAllTask = async (object: sort, query: ParsedQs) => {
  const colmn = object.columns;
  const num = object.pos;
  let sort = {};
  sort = { colmn: num };
  if (colmn) {
    sort = { [colmn]: num };
  }
  const { search, page, limit } = query;
  const colmns = [
    "subject",
    "description",
    "statusType",
    "assignedTo",
    "assignedBy",
    "Date",
  ];
  const filterQuery: filterQuery = { $or: [] };
  if (typeof search == "string") {
    const searchString = search.trim();
    const or: queryObject[] = [];
    colmns.forEach((col) => {
      if (col === "Date") {
        or.push({
          [col]: {
            $gte: new Date(moment(searchString, "MM/DD/YYYY").format()),
            //   // $lt: new Date(moment(searchString, 'MM/DD/YYYY').format()),
          },
        });
      } else {
        or.push({
          [col]: { $regex: `.*${searchString}.*`, $options: "i" },
        });
      }
    });
    filterQuery.$or = or;
  }
  const all = taskSchema.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedBy",
        foreignField: "_id",
        as: "assignedBy",
      },
    },
    {
      $unwind: {
        path: "$assignedBy",
      },
    },
    {
      $unwind: {
        path: "$assignedTo",
      },
    },

    {
      $project: {
        subject: 1,
        description: 1,
        assignedTo: "$assignedTo.name",
        assignedBy: "$assignedBy.name",
        statusType: 1,
        Date: 1,
      },
    },
    {
      $sort: sort,
    },
    {
      $match: filterQuery,
    },
  ]);
  const respose: object = {};
  const options: object = {
    page,
    limit,
  };

  try {
    const response = await taskSchema.aggregatePaginate(all, options);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return respose;
};

const getOneTask = async (oneid: string) => {
  const one = await taskSchema
    .findById(oneid)
    .populate("assignedTo", "name")
    .populate("assignedBy", "name");
  return one;
};

const getMyAllTask = async (object: sort, assign: { assignedTo: string }) => {
  const assignedTo = assign.assignedTo
  const colmn = object.columns;
  const num = object.pos;
  let sort = {};
  sort = { colmn: num };
  if (colmn) {
    sort = { [colmn]: num };
  }
  const all = await taskSchema.aggregate([

    { $match: { assignedTo: new mongoose.Types.ObjectId(assignedTo) } },

    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedBy",
        foreignField: "_id",
        as: "assignedBy",
      },
    },
    {
      $unwind: {
        path: "$assignedBy",
      },
    },
    {
      $unwind: {
        path: "$assignedTo",
      },
    }, {
      $sort: sort
    }

  ]);
  return all;
}


export {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getOneTask,
  getMyAllTask,
};

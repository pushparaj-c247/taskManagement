import taskSchema from "../Model/taskModel";
import objs from "../interfaces/taskInterface";
import { demo } from "../interfaces/userInterface";

const createTask = (obj: objs) => {
  taskSchema.create({
    subject: obj.subject,
    description: obj.description,
    assignedTo: obj.assignedTo,
    assignedBy: obj.assignedBy,
    statusType: obj.statusType,
  });

  return " Task Is Created Sucessfully";
};
const updateTask = async (id: string, obj: objs) => {
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
const deleteTask = async (id: string) => {
  await taskSchema.findByIdAndDelete(id);
  return " Task Is Deleted Sucessfully";
};
const getAllTask = async () => {
  const all = await taskSchema.find().populate(["assignedTo", "assignedBy"]);
  return all;
};

const getOneTask = async (oneid: string) => {
  const one = await taskSchema
    .findById(oneid)
    .populate(["assignedTo", "assignedBy"]);
  return one;
};

const getMyAllTask = async (assign: demo) => {
  const { assignedTo } = assign;
  const myT = await taskSchema.find({ assignedTo });
  return myT;
};

export {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getOneTask,
  getMyAllTask,
};

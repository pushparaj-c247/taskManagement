import taskSchema from "../Model/taskModel";
import objs from "../interfaces/taskInterface";

const createTask = (obj: objs) => {
  taskSchema.create({
    subject: obj.subject,
    description: obj.description,
    assignedTo: obj.assignedTo,
    assignedBy: obj.assignedBy,
  });

  return " Task Is Created Sucessfully";
};
const updateTask = async (id: string, obj: objs) => {
  await taskSchema.findByIdAndUpdate(id, { $set: { task: obj.subject } });
  return " Task Is Updated Sucessfully";
};
const deleteTask = async (id: string) => {
  await taskSchema.findByIdAndDelete(id);
  return " Task Is Deleted Sucessfully";
};
const getAllTask = async () => {
  const all = await taskSchema.find();
  return all;
};

const getOneTask = async (oneid: string) => {
  const one = await taskSchema.findById(oneid);
  return one;
};

export { createTask, updateTask, deleteTask, getAllTask, getOneTask };

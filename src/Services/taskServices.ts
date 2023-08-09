import taskSchema from "../Model/taskModel";
import obj from "../interfaces/taskInterface";

const createTask = (obj: obj) => {
  taskSchema.create({
    task: obj.task,
  });
  return " Task Is Created Sucessfully";
};
const updateTask =  () => {

  return " Task Is Updated Sucessfully";
};
const deleteTask = async (id: string) => {
  await taskSchema.findByIdAndDelete(id);
  return " Task Is Deleted Sucessfully";
};

export { createTask, updateTask, deleteTask };

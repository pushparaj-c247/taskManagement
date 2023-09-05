import UserSchema from "../Model/userModel";
import taskSchema from "../Model/taskModel";
import data from "./data";

export const populate = async () =>{
    await UserSchema.deleteMany({});
    await UserSchema.create(data.data.users)
  
}
export const taskPopulate = async () =>{
    await taskSchema.deleteMany({})
    await taskSchema.create(data.task.tasks)
}
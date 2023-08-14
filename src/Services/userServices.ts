import userSchema from "../Model/userModel";
import obj from "../interfaces/userInterface";

const createUser = (obj: obj) => {
  userSchema.create({
    userName: obj.userName,
    email: obj.email,
    password: obj.password,
  });
  return " User Is Created Sucessfully";
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

const getAllUser = async () =>{
  const all = await userSchema.find();
  return all ;
}
const getOneUser = async (usid: string) =>{
  const one = await userSchema.findById(usid);
  return one;
}

export { createUser, updateUser, deleteUser, getAllUser, getOneUser};

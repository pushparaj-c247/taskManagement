import userSchema from "../Model/userModel";
import obj from "../interfaces/userInterface";


const createUser = (obj: obj) => {
  userSchema.create({
    name: obj.name,
    email: obj.email,
    password: obj.password,
  });
  return " User Is Created Sucessfully";
};
const updateUser = async(id: string, obj: obj) => {
  await userSchema.findByIdAndUpdate(id, { $set: { name: obj.name, email: obj.email, password: obj.password } })
  return " User Is Updated Sucessfully";
};
const deleteUser = async (id: string) => {
  await userSchema.findByIdAndDelete(id);
  return "User Is Deleted Sucessfully";
};

export { createUser, updateUser, deleteUser };

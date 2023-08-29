import UserSchema from "../Model/userModel";
import data from "./data";

export const populate = async () =>{
    await UserSchema.deleteMany({});
    await UserSchema.create(data.users)
}
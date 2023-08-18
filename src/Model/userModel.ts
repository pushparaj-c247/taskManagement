import mongoose from "mongoose";
import {obj} from "../interfaces/userInterface";


const UserSchema = new mongoose.Schema<obj>({
  name: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    unique: true
   
  },
  password: {
    type: String,
    required: true
    
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

});

export default mongoose.model<obj>("user", UserSchema);

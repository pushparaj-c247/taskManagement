import mongoose from "mongoose";
import objs from "../interfaces/taskInterface";

const taskSchema = new mongoose.Schema<objs>({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  statusType: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },

  Date: { type: Date, default: Date.now },
  
});

export default mongoose.model<objs>("task", taskSchema);

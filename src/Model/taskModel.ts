import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  statusType: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },

  Date: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("task", taskSchema);

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
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  statusType: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },

  Date: { type: Date, default: Date.now },
});

export default mongoose.model("task", taskSchema);

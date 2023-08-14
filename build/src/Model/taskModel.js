"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    statusType: {
        type: String,
        enum: ['pending', 'completed'], default: 'pending'
    },
    Date: { type: Date, required: true, default: Date.now },
});
exports.default = mongoose_1.default.model("task", taskSchema);

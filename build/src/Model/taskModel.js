"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const taskSchema = new mongoose_1.default.Schema({
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    assignedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
taskSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = mongoose_1.default.model("task", taskSchema);

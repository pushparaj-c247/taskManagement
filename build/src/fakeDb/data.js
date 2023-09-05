"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const data = {
    users: [{
            name: "user",
            email: "u@gmail.com",
            password: "123",
            role: "user"
        }, {
            name: "admin",
            email: "b@gmail.com",
            password: "123",
            role: "admin"
        }]
};
const task = {
    tasks: [{
            subject: "mobile",
            description: "samsung",
            assignedTo: new mongoose_1.default.Types.ObjectId("64df197f0bbb849af9265421"),
            assignedBy: new mongoose_1.default.Types.ObjectId("64df19b40bbb849af9265423"),
            statusType: "pending",
        }]
};
exports.default = { data, task };

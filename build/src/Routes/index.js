"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = exports.router = void 0;
const taskRoute_1 = __importDefault(require("../Routes/taskRoute"));
exports.router = taskRoute_1.default;
const userRoute_1 = __importDefault(require("../Routes/userRoute"));
exports.routers = userRoute_1.default;

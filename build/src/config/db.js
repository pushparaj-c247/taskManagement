"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeConnection = exports.connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
function connections() {
    mongoose_1.default
        .connect(env_1.DB_URL)
        .then(() => console.log("DB connected "))
        .catch(() => console.log("error in DB"));
}
exports.connections = connections;
function fakeConnection() {
    mongoose_1.default
        .connect("mongodb://127.0.0.1:27017/testing")
        .then(() => console.log("DB connected fake "))
        .catch(() => console.log("error in fake DB"));
}
exports.fakeConnection = fakeConnection;

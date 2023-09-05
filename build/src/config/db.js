"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeConnection = exports.connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "";
function connections() {
    if (NODE_ENV == "dev") {
        mongoose_1.default
            .connect('mongodb://127.0.0.1:27017/User')
            .then(() => console.log("DB connected "))
            .catch(() => console.log("error in DB"));
    }
}
exports.connections = connections;
function fakeConnection() {
    if (NODE_ENV == "testing") {
        mongoose_1.default
            .connect("mongodb://127.0.0.1:27017/testing")
            .then(() => console.log("DB connected fake "))
            .catch(() => console.log("error in fake DB"));
    }
}
exports.fakeConnection = fakeConnection;

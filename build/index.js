"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./src/Routes/userRoute"));
const taskRoute_1 = __importDefault(require("./src/Routes/taskRoute"));
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/User");
        console.log("sucess db");
    }
    catch (error) {
        console.log("error in db");
    }
});
connection();
app.use("/user", userRoute_1.default);
app.use("/task", taskRoute_1.default);
app.listen(port, () => {
    console.log("server is started");
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./src/Routes/userRoute"));
const taskRoute_1 = __importDefault(require("./src/Routes/taskRoute"));
const db_1 = __importDefault(require("./src/config/db"));
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/user", userRoute_1.default);
app.use("/task", taskRoute_1.default);
app.listen(port, () => {
    console.log("server is started");
});

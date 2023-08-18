"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./src/Routes/userRoute"));
const taskRoute_1 = __importDefault(require("./src/Routes/taskRoute"));
const db_1 = __importDefault(require("./src/config/db"));
const env_1 = require("./src/config/env");
const passport_1 = __importDefault(require("./src/config/passport"));
const errorHandler_1 = __importDefault(require("./src/middleware/errorHandler"));
const errorLast_1 = __importDefault(require("./src/middleware/errorLast"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
(0, db_1.default)();
app.use("/user", userRoute_1.default);
app.use("/task", taskRoute_1.default);
app.use(errorHandler_1.default);
app.use(errorLast_1.default);
app.listen(env_1.port, () => {
    console.log("server is started");
});

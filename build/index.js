"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./src/Routes/index");
const db_1 = __importDefault(require("./src/config/db"));
const env_1 = require("./src/config/env");
const index_2 = require("./src/middleware/index");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(index_2.passport.initialize());
(0, db_1.default)();
app.use("/user", index_1.routers);
app.use("/task", index_1.router);
app.use(index_2.errorHandler);
app.use(index_2.errorLast);
app.listen(env_1.port, () => {
    console.log("server is started");
});

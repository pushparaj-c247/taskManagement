"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./src/Routes/index");
const db_1 = require("./src/config/db");
const env_1 = require("./src/config/env");
const index_2 = require("./src/middleware/index");
const constant_1 = __importDefault(require("./src/helper/constant"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(index_2.passport.initialize());
(0, db_1.connections)();
exports.app.use(`/${constant_1.default}/user`, index_1.routers);
exports.app.use(`/${constant_1.default}/task`, index_1.router);
exports.app.use(index_2.errorHandler);
exports.app.use(index_2.errorLast);
exports.app.listen(env_1.port, () => {
    console.log("server is started");
});
exports.default = exports.app;

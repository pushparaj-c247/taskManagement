"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log("errorHandler", err);
    next();
};
exports.default = errorHandler;

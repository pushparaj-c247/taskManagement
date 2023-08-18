"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorLast = (req, res, next) => {
    res.status(500);
    res.send("Something Went Wrong");
};
exports.default = errorLast;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization = (role) => {
    return (req, res, next) => {
        const users = req.user;
        if (users.role === role) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
};
exports.default = authorization;

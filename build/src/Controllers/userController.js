"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsercontroller = exports.updateUserController = exports.createUserController = void 0;
const userServices_1 = require("../Services/userServices");
const createUserController = (req, res) => {
    const createU = (0, userServices_1.createUser)(req.body);
    return res.send(createU);
};
exports.createUserController = createUserController;
const updateUserController = (req, res) => {
    const updateU = (0, userServices_1.updateUser)(req.params.id, req.body);
    return res.send(updateU);
};
exports.updateUserController = updateUserController;
const deleteUsercontroller = (req, res) => {
    const deletU = (0, userServices_1.deleteUser)(req.params.id);
    return res.send(deletU);
};
exports.deleteUsercontroller = deleteUsercontroller;

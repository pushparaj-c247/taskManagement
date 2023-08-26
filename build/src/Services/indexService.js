"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = require("../Services/userServices");
const taskServices_1 = require("../Services/taskServices");
exports.default = { createUser: userServices_1.createUser, updateUser: userServices_1.updateUser, deleteUser: userServices_1.deleteUser, getAllUser: userServices_1.getAllUser, getOneUser: userServices_1.getOneUser, login: userServices_1.login, createTask: taskServices_1.createTask,
    updateTask: taskServices_1.updateTask,
    deleteTask: taskServices_1.deleteTask,
    getAllTask: taskServices_1.getAllTask,
    getOneTask: taskServices_1.getOneTask,
    getMyAllTask: taskServices_1.getMyAllTask, };

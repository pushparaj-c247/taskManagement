"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskcontroller = exports.updateTaskController = exports.createTaskController = void 0;
const taskServices_1 = require("../Services/taskServices");
const createTaskController = (req, res) => {
    const createT = (0, taskServices_1.createTask)(req.body);
    return res.send(createT);
};
exports.createTaskController = createTaskController;
const updateTaskController = (req, res) => {
    const updateT = (0, taskServices_1.updateTask)();
    return res.send(updateT);
};
exports.updateTaskController = updateTaskController;
const deleteTaskcontroller = (req, res) => {
    const deletT = (0, taskServices_1.deleteTask)(req.params.id);
    return res.send(deletT);
};
exports.deleteTaskcontroller = deleteTaskcontroller;

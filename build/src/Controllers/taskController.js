"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneTaskControlller = exports.getAllTaskControlller = exports.deleteTaskcontroller = exports.updateTaskController = exports.createTaskController = void 0;
const taskServices_1 = require("../Services/taskServices");
const createTaskController = (req, res) => {
    const createT = (0, taskServices_1.createTask)(req.body);
    return res.send(createT);
};
exports.createTaskController = createTaskController;
const updateTaskController = (req, res) => {
    const updateT = (0, taskServices_1.updateTask)(req.params.id, req.body);
    return res.send(updateT);
};
exports.updateTaskController = updateTaskController;
const deleteTaskcontroller = (req, res) => {
    const deletT = (0, taskServices_1.deleteTask)(req.params.id);
    return res.send(deletT);
};
exports.deleteTaskcontroller = deleteTaskcontroller;
const getAllTaskControlller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alltask = yield (0, taskServices_1.getAllTask)();
    return res.send(alltask);
});
exports.getAllTaskControlller = getAllTaskControlller;
const getOneTaskControlller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oneTask = yield (0, taskServices_1.getOneTask)(req.params.id);
    return res.send(oneTask);
});
exports.getOneTaskControlller = getOneTaskControlller;

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
exports.getMyAllTaskController = exports.getOneTaskControlller = exports.getAllTaskControlller = exports.deleteTaskcontroller = exports.updateTaskController = exports.createTaskController = void 0;
const taskServices_1 = require("../Services/taskServices");
const createTaskController = (req, res, next) => {
    try {
        const createT = (0, taskServices_1.createTask)(req.body);
        return res.send(createT);
    }
    catch (error) {
        console.log("Error In CrateTask");
        next(error);
    }
};
exports.createTaskController = createTaskController;
const updateTaskController = (req, res, next) => {
    try {
        const updateT = (0, taskServices_1.updateTask)(req.params.id, req.body, req.user);
        return res.send(updateT);
    }
    catch (error) {
        console.log("Error In UpdateTask");
        next(error);
    }
};
exports.updateTaskController = updateTaskController;
const deleteTaskcontroller = (req, res, next) => {
    try {
        const deletT = (0, taskServices_1.deleteTask)(req.params.id, req.user);
        return res.send(deletT);
    }
    catch (error) {
        console.log("Error In DeleteTask");
        next(error);
    }
};
exports.deleteTaskcontroller = deleteTaskcontroller;
const getAllTaskControlller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alltask = yield (0, taskServices_1.getAllTask)(req.body, req.query);
        return res.send(alltask);
    }
    catch (error) {
        console.log("Error In GetAllTask");
        next(error);
    }
});
exports.getAllTaskControlller = getAllTaskControlller;
const getOneTaskControlller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneTask = yield (0, taskServices_1.getOneTask)(req.params.id);
        return res.send(oneTask);
    }
    catch (error) {
        console.log("Error In GetOneTask");
        next(error);
    }
});
exports.getOneTaskControlller = getOneTaskControlller;
const getMyAllTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield (0, taskServices_1.getMyAllTask)(req.body, req.body);
        return res.send(task);
    }
    catch (error) {
        console.log("Error In GetMyAllTask");
        next(error);
    }
});
exports.getMyAllTaskController = getMyAllTaskController;

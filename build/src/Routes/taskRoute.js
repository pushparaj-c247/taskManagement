"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../Controllers/taskController");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const passport_1 = __importDefault(require("../config/passport"));
const router = (0, express_1.Router)();
router.post("/createTask", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.createTaskController);
router.put("/updateTask/:id", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.updateTaskController);
router.delete("/deleteTask/:id", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.deleteTaskcontroller);
router.get("/getOneTask/:id", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.getOneTaskControlller);
router.get("/getAllTask", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.getAllTaskControlller);
router.get("/getMyAllTask", passport_1.default.authenticate("jwt", { session: false }), (0, authorization_1.default)("admin"), taskController_1.getMyAllTaskController);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../Controllers/taskController");
const router = (0, express_1.Router)();
router.post("/createTask", taskController_1.createTaskController);
router.put("/updateTask/:id", taskController_1.updateTaskController);
router.delete("/deleteTask/:id", taskController_1.deleteTaskcontroller);
exports.default = router;

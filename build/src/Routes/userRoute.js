"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const router = (0, express_1.Router)();
router.post("/createUser", userController_1.createUserController);
router.put("/updateUser/:id", userController_1.updateUserController);
router.delete("/deleteUser/:id", userController_1.deleteUsercontroller);
exports.default = router;
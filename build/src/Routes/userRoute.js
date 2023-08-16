"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const passport_1 = __importDefault(require("../config/passport"));
const router = (0, express_1.Router)();
router.post("/createUser", userController_1.createUserController);
router.put("/updateUser/:id", userController_1.updateUserController);
router.delete("/deleteUser/:id", userController_1.deleteUsercontroller);
router.get("/getAllUser", userController_1.getAllUserControlller);
router.get("/getOneUser/:id", userController_1.getOneUserControlller);
router.get("/get-verify", passport_1.default.authenticate('jwt', { session: false }), userController_1.getVerifyController);
router.post("/login", userController_1.loginController);
exports.default = router;

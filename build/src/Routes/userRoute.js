"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const passport_1 = __importDefault(require("../config/passport"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/createUser", userController_1.createUserController);
router.put("/updateUser/:id", userController_1.updateUserController);
router.delete("/deleteUser/:id", userController_1.deleteUsercontroller);
router.get("/getAllUser", passport_1.default.authenticate('jwt', { session: false }), (0, authorization_1.default)("admin"), userController_1.getAllUserControlller);
router.get("/getOneUser/:id", passport_1.default.authenticate('jwt', { session: false }), (0, authorization_1.default)("admin"), userController_1.getOneUserControlller);
router.post("/login", (0, express_validator_1.body)('email').notEmpty(), (0, express_validator_1.body)('password').notEmpty(), userController_1.loginController);
exports.default = router;

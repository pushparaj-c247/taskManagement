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
exports.loginController = exports.getOneUserControlller = exports.getAllUserControlller = exports.deleteUsercontroller = exports.updateUserController = exports.createUserController = void 0;
const userServices_1 = require("../Services/userServices");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createU = yield (0, userServices_1.createUser)(req.body);
        return res.send(createU);
    }
    catch (error) {
        console.log("Error In CreateUser");
        next(error);
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res, next) => {
    try {
        const updateU = (0, userServices_1.updateUser)(req.params.id, req.body);
        return res.send(updateU);
    }
    catch (error) {
        console.log("Error In UpdateUser");
        next(error);
    }
};
exports.updateUserController = updateUserController;
const deleteUsercontroller = (req, res, next) => {
    try {
        const deletU = (0, userServices_1.deleteUser)(req.params.id);
        return res.send(deletU);
    }
    catch (error) {
        console.log("Error In DeleteUser");
        next(error);
    }
};
exports.deleteUsercontroller = deleteUsercontroller;
const getAllUserControlller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield (0, userServices_1.getAllUser)();
        return res.send(allUser);
    }
    catch (error) {
        console.log("Error In GetAllUser");
        next(error);
    }
});
exports.getAllUserControlller = getAllUserControlller;
const getOneUserControlller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneUser = yield (0, userServices_1.getOneUser)(req.params.id);
        return res.send(oneUser);
    }
    catch (error) {
        console.log("Error In GetOneUser");
        next(error);
    }
});
exports.getOneUserControlller = getOneUserControlller;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, userServices_1.login)(req, res);
    }
    catch (error) {
        console.log("Error In LoginUser");
        next(error);
    }
});
exports.loginController = loginController;

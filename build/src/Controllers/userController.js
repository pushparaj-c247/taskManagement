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
exports.getOneUserControlller = exports.getAllUserControlller = exports.deleteUsercontroller = exports.updateUserController = exports.createUserController = void 0;
const userServices_1 = require("../Services/userServices");
const createUserController = (req, res) => {
    const createU = (0, userServices_1.createUser)(req.body);
    return res.send(createU);
};
exports.createUserController = createUserController;
const updateUserController = (req, res) => {
    const updateU = (0, userServices_1.updateUser)(req.params.id, req.body);
    return res.send(updateU);
};
exports.updateUserController = updateUserController;
const deleteUsercontroller = (req, res) => {
    const deletU = (0, userServices_1.deleteUser)(req.params.id);
    return res.send(deletU);
};
exports.deleteUsercontroller = deleteUsercontroller;
const getAllUserControlller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield (0, userServices_1.getAllUser)();
    return res.send(allUser);
});
exports.getAllUserControlller = getAllUserControlller;
const getOneUserControlller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oneUser = yield (0, userServices_1.getOneUser)(req.params.id);
    return res.send(oneUser);
});
exports.getOneUserControlller = getOneUserControlller;

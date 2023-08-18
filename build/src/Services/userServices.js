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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getOneUser = exports.getAllUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const createUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    obj.password = yield bcrypt_1.default.hash(obj.password, 10);
    yield userModel_1.default.create(obj);
    return "user created";
});
exports.createUser = createUser;
const updateUser = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndUpdate(id, {
        $set: { userName: obj.name, email: obj.email, password: obj.password },
    });
    return " User Is Updated Sucessfully";
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndDelete(id);
    return "User Is Deleted Sucessfully";
});
exports.deleteUser = deleteUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const all = yield userModel_1.default.find();
    return all;
});
exports.getAllUser = getAllUser;
const getOneUser = (usid) => __awaiter(void 0, void 0, void 0, function* () {
    const one = yield userModel_1.default.findById(usid);
    return one;
});
exports.getOneUser = getOneUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result["errors"][0] });
    }
    const { email, password } = req.body;
    const obj = yield userModel_1.default.findOne({
        email: email,
    });
    if (!obj) {
        return res.status(400).json({
            message: "invalid username & password",
        });
    }
    const passwordMatch = bcrypt_1.default.compare(password, obj.password);
    if (!passwordMatch) {
        return res.status(400).json({ messge: "invalid username & password" });
    }
    const token = jsonwebtoken_1.default.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
        expiresIn: "1h",
    });
    res.json({ message: "logged in successfully", token });
});
exports.login = login;

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
exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const createUser = (obj) => {
    userModel_1.default.create({
        name: obj.name,
        email: obj.email,
        password: obj.password,
    });
    return " User Is Created Sucessfully";
};
exports.createUser = createUser;
const updateUser = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndUpdate(id, { $set: { name: obj.name, email: obj.email, password: obj.password } });
    return " User Is Updated Sucessfully";
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndDelete(id);
    return "User Is Deleted Sucessfully";
});
exports.deleteUser = deleteUser;

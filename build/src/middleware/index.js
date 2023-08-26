"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLast = exports.errorHandler = exports.passport = void 0;
const passport_1 = __importDefault(require("../config/passport"));
exports.passport = passport_1.default;
const errorHandler_1 = __importDefault(require("./errorHandler"));
exports.errorHandler = errorHandler_1.default;
const errorLast_1 = __importDefault(require("./errorLast"));
exports.errorLast = errorLast_1.default;

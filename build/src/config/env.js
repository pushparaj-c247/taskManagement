"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = exports.Port = exports.FAKE_URL = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
exports.FAKE_URL = (_b = process.env.FAKE_URL) !== null && _b !== void 0 ? _b : "";
exports.Port = process.env.Port;
exports.Key = process.env.Key;

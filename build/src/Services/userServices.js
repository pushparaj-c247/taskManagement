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
const express_validator_1 = require("express-validator");
const createUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.create(obj);
    return "user created";
});
exports.createUser = createUser;
const updateUser = (id, obj, user) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = user._id.toString();
    if (id !== ids) {
        return console.log("invalid");
    }
    yield userModel_1.default.findByIdAndUpdate(id, {
        userName: obj.name,
        email: obj.email,
        password: obj.password,
    });
    return " User Is Updated Sucessfully";
});
exports.updateUser = updateUser;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = user._id.toString();
    if (id !== ids) {
        return console.log("invalid");
    }
    yield userModel_1.default.findByIdAndDelete(id);
    return "User Is Deleted Sucessfully";
});
exports.deleteUser = deleteUser;
const getAllUser = (object, query) => __awaiter(void 0, void 0, void 0, function* () {
    const colmn = object.columns;
    const num = object.pos;
    let sort = {};
    sort = { colmn: num };
    if (colmn) {
        sort = { [colmn]: num };
    }
    const { search, page, limit } = query;
    const colmns = [
        "name",
        "email",
        "password",
        "role",
    ];
    const filterQuery = { $or: [] };
    if (typeof search == "string") {
        const searchString = search.trim();
        const or = [];
        colmns.forEach((col) => {
            if (search) {
                or.push({
                    [col]: { $regex: `.*${searchString}.*`, $options: "i" },
                });
            }
        });
        filterQuery.$or = or;
    }
    const all = userModel_1.default.aggregate([
        {
            $match: filterQuery,
        },
        {
            $project: {
                name: 1,
                email: 1,
                password: 1,
                role: 1
            },
        },
        {
            $sort: sort
        }
    ]);
    const respose = {};
    const options = {
        page,
        limit,
    };
    try {
        const response = yield userModel_1.default.aggregatePaginate(all, options);
        return response;
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    return respose;
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
    const passwordMatch = yield obj.validatePassword(password);
    if (!passwordMatch) {
        return res.status(400).json({ messge: "invalid username & password" });
    }
    const token = jsonwebtoken_1.default.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
        expiresIn: "1h",
    });
    res.json({ message: "logged in successfully", token });
});
exports.login = login;

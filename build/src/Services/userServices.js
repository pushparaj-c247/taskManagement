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
const ioredis_1 = __importDefault(require("ioredis"));
const createUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield userModel_1.default.create(obj);
    return create;
});
exports.createUser = createUser;
const updateUser = (obj, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = _id;
    yield userModel_1.default.findByIdAndUpdate(ids, {
        userName: obj.name,
        email: obj.email,
        password: obj.password,
    });
    return "User Is Updated Successfully";
});
exports.updateUser = updateUser;
const deleteUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = _id;
    yield userModel_1.default.findByIdAndDelete(ids);
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
    const redisclient = new ioredis_1.default();
    const cachedData = yield redisclient.get(`allUser?col${search}?page=${page}?limit${limit}`);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    else {
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
        const options = {
            page,
            limit,
        };
        const response = yield userModel_1.default.aggregatePaginate(all, options);
        redisclient.set(`allUser?col${search}?page=${page}?limit${limit}`, JSON.stringify(response));
        return response;
    }
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
        return res.status(401).json({
            message: "invalid username & password",
        });
    }
    // Password validation using regex pattern
    // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // if (!passwordPattern.test(password)) {
    //   return res.status(400).json({
    //     message: "Invalid password format",
    //   });
    // }
    const passwordMatch = yield obj.validatePassword(password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ email: obj.email, name: obj.name }, "ABcdefg", {
        expiresIn: "1h",
    });
    res.json({ message: "logged in successfully", token });
});
exports.login = login;

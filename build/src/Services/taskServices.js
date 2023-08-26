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
exports.getMyAllTask = exports.getOneTask = exports.getAllTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const moment_1 = __importDefault(require("moment"));
const taskModel_1 = __importDefault(require("../Model/taskModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTask = (obj) => {
    taskModel_1.default.create({
        subject: obj.subject,
        description: obj.description,
        assignedTo: obj.assignedTo,
        assignedBy: obj.assignedBy,
        statusType: obj.statusType,
    });
    return " Task Is Created Sucessfully";
};
exports.createTask = createTask;
const updateTask = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield taskModel_1.default.findByIdAndUpdate(id, {
        $set: {
            subject: obj.subject,
            description: obj.description,
            assignedTo: obj.assignedTo,
            assignedBy: obj.assignedBy,
            statusType: obj.statusType,
        },
    });
    return " Task Is Updated Sucessfully";
});
exports.updateTask = updateTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield taskModel_1.default.findByIdAndDelete(id);
    return " Task Is Deleted Sucessfully";
});
exports.deleteTask = deleteTask;
const getAllTask = (object, query) => __awaiter(void 0, void 0, void 0, function* () {
    const colmn = object.columns;
    const num = object.pos;
    let sort = {};
    sort = { colmn: num };
    if (colmn) {
        sort = { [colmn]: num };
    }
    const { search, page, limit } = query;
    const colmns = [
        "subject",
        "description",
        "statusType",
        "assignedTo",
        "assignedBy",
        "Date",
    ];
    const filterQuery = { $or: [] };
    if (typeof search == "string") {
        const searchString = search.trim();
        const or = [];
        colmns.forEach((col) => {
            if (col === "Date") {
                or.push({
                    [col]: {
                        $gte: new Date((0, moment_1.default)(searchString, "MM/DD/YYYY").format()),
                        //   // $lt: new Date(moment(searchString, 'MM/DD/YYYY').format()),
                    },
                });
            }
            else {
                or.push({
                    [col]: { $regex: `.*${searchString}.*`, $options: "i" },
                });
            }
        });
        filterQuery.$or = or;
    }
    const all = taskModel_1.default.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedBy",
                foreignField: "_id",
                as: "assignedBy",
            },
        },
        {
            $unwind: {
                path: "$assignedBy",
            },
        },
        {
            $unwind: {
                path: "$assignedTo",
            },
        },
        {
            $project: {
                subject: 1,
                description: 1,
                assignedTo: "$assignedTo.name",
                assignedBy: "$assignedBy.name",
                statusType: 1,
                Date: 1,
            },
        },
        {
            $sort: sort,
        },
        {
            $match: filterQuery,
        },
    ]);
    const respose = {};
    const options = {
        page,
        limit,
    };
    try {
        const response = yield taskModel_1.default.aggregatePaginate(all, options);
        return response;
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    return respose;
});
exports.getAllTask = getAllTask;
const getOneTask = (oneid) => __awaiter(void 0, void 0, void 0, function* () {
    const one = yield taskModel_1.default
        .findById(oneid)
        .populate("assignedTo", "name")
        .populate("assignedBy", "name");
    return one;
});
exports.getOneTask = getOneTask;
const getMyAllTask = (object, assign, user, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = user._id.toString();
    const ass = obj.assignedTo.toString();
    if (ass !== ids) {
        return console.log("invalid");
    }
    const assignedTo = assign.assignedTo;
    const colmn = object.columns;
    const num = object.pos;
    let sort = {};
    sort = { colmn: num };
    if (colmn) {
        sort = { [colmn]: num };
    }
    const all = yield taskModel_1.default.aggregate([
        { $match: { assignedTo: new mongoose_1.default.Types.ObjectId(assignedTo) } },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedBy",
                foreignField: "_id",
                as: "assignedBy",
            },
        },
        {
            $unwind: {
                path: "$assignedBy",
            },
        },
        {
            $unwind: {
                path: "$assignedTo",
            },
        }, {
            $sort: sort
        }
    ]);
    return all;
});
exports.getMyAllTask = getMyAllTask;

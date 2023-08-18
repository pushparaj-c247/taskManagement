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
const taskModel_1 = __importDefault(require("../Model/taskModel"));
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
const getAllTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const all = yield taskModel_1.default.find().populate(["assignedTo", "assignedBy"]);
    return all;
});
exports.getAllTask = getAllTask;
const getOneTask = (oneid) => __awaiter(void 0, void 0, void 0, function* () {
    const one = yield taskModel_1.default
        .findById(oneid)
        .populate(["assignedTo", "assignedBy"]);
    return one;
});
exports.getOneTask = getOneTask;
const getMyAllTask = (assign) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignedTo } = assign;
    const myT = yield taskModel_1.default.find({ assignedTo });
    return myT;
});
exports.getMyAllTask = getMyAllTask;

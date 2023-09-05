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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../src/config/db");
const fakeDb_1 = require("../src/fakeDb/fakeDb");
const constant_1 = __importDefault(require("../src/helper/constant"));
const chai_1 = require("chai");
(0, db_1.fakeConnection)();
const adminDetails = { email: "b@gmail.com", password: "123", role: "admin" };
let token = "";
let taskId;
before(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fakeDb_1.taskPopulate)();
    token = jsonwebtoken_1.default.sign({ email: adminDetails.email, role: adminDetails.role }, "ABcdefg", {
        expiresIn: "24h",
        algorithm: "HS256"
    });
}));
describe('Create task', () => {
    it("When any field is empty", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/task/createTask`)
            .set('Authorization', `Bearer ${token}`)
            .send({ subject: "", description: "", assignedTo: "", assignedBy: "", statusType: "" })
            .expect(401)
            .then(done())
            .catch((err) => {
            //  done(err)
            console.log(err);
        });
    });
});
it("This will for Created task", (done) => {
    supertest_1.default.agent(index_1.default)
        .post(`/${constant_1.default}/task/createTask`)
        .set('Authorization', `Bearer ${token}`)
        .send({ subject: "chapter", description: "my name is pushparaj", assignedTo: "64f1c2681dec204eee122838", assignedBy: "64f1c2681dec204eee122839", statusType: "pending", })
        .expect(200)
        .then((res) => {
        (0, chai_1.expect)(res.body._id);
        taskId = res.body._id;
        done();
    })
        .catch((err) => {
        done(err);
    });
});
describe('Get All Task', () => {
    it("should get all Task", (done) => {
        supertest_1.default.agent(index_1.default)
            .get(`/${constant_1.default}/task/getAllTask?search=pending&page=1&limit&1`)
            .set('Authorization', `Bearer ${token}`)
            .send({ columns: "statusType", pos: 1 })
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body).to.have.property('docs');
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});

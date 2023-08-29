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
/* eslint-disable */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const db_1 = require("../src/config/db");
const fakeDb_1 = require("../src/fakeDb/fakeDb");
const constant_1 = __importDefault(require("../src/helper/constant"));
(0, db_1.fakeConnection)();
// const app = express();
before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fakeDb_1.populate)();
    });
});
const loginDetails = { email: "a@gmail.com", password: "123" };
let token;
describe('Authentication', () => __awaiter(void 0, void 0, void 0, function* () {
    it("should handle invalid Username and password", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/login`)
            .send({ email: "u@", password: "456" })
            .expect(401)
            .then(done())
            .catch((err) => {
            console.log(err);
        });
    });
    it("this is for valid username & password", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/login`)
            .send(loginDetails)
            .expect(200)
            .then(done()).catch((error) => {
            console.log(error);
        });
    });
}));
// );

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
const chai_1 = require("chai");
(0, db_1.fakeConnection)();
let admintoken;
let token;
let userId;
before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fakeDb_1.populate)();
    });
});
const loginDetails = { email: "u@gmail.com", password: "123" };
const adminDetails = { email: "b@gmail.com", password: "123" };
describe('Authentication', () => {
    it("should handle invalid Username and password", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/login`)
            .send({ email: "u@m.com", password: "456" })
            .expect(401)
            .then(done())
            .catch((err) => {
            done(err);
        });
    });
    it("this is for valid username & password and return a token", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/login`)
            .send(loginDetails)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.token);
            token = res.body.token;
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
    it("when i want only admin token", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/login`)
            .send(adminDetails)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.token);
            admintoken = res.body.token;
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});
describe('Create User', () => {
    it("When any field is empty", (done) => {
        supertest_1.default.agent(index_1.default)
            .post(`/${constant_1.default}/user/createUser`)
            .send({ name: "", email: "", password: "", role: "" })
            .expect(401)
            .then(done())
            .catch((err) => {
            done(err);
        });
    });
});
it("This will return when User is Created", (done) => {
    supertest_1.default.agent(index_1.default)
        .post(`/${constant_1.default}/user/createUser`)
        .send({ name: "aman", email: "aman@gmail.com", password: "123", role: "admin" })
        .expect(200)
        .then((res) => {
        (0, chai_1.expect)(res.body._id);
        userId = res.body._id;
        done();
    })
        .catch((err) => {
        done(err);
    });
});
describe('Delete User', () => {
    it("should delete a user", (done) => {
        supertest_1.default.agent(index_1.default)
            .delete(`/${constant_1.default}/user/deleteUser`)
            .set('Authorization', `Bearer ${token}`) // Set the authorization token
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.text).to.equal("User Is Deleted Sucessfully");
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});
describe('Update User', () => {
    it("should update a user", (done) => {
        const updatedUserData = { name: "Updated Name", email: "updated@example.com", role: "admin" };
        supertest_1.default.agent(index_1.default)
            .put(`/${constant_1.default}/user/updateUser`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUserData)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.text).to.equal("User Is Updated Successfully");
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});
describe('Get All Users', () => {
    it("should get all users", (done) => {
        supertest_1.default.agent(index_1.default)
            .get(`/${constant_1.default}/user/getAllUser?search=admin&page=1&limit&1`)
            .set('Authorization', `Bearer ${admintoken}`)
            .send({ columns: "name", pos: 1 })
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
describe('Get One User', () => {
    it("should get one user", (done) => {
        supertest_1.default.agent(index_1.default)
            .get(`/${constant_1.default}/user/getOneUser/${userId}`)
            .set('Authorization', `Bearer ${admintoken}`)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body).to.have.property('_id', userId);
            (0, chai_1.expect)(res.body).to.have.property('name');
            (0, chai_1.expect)(res.body).to.have.property('email');
            (0, chai_1.expect)(res.body).to.have.property('role');
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});

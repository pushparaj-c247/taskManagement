/* eslint-disable */
import request from "supertest"
import app from "../index"
import { fakeConnection } from "../src/config/db";
import { populate } from "../src/fakeDb/fakeDb";
import version from "../src/helper/constant";
import { expect } from "chai";

fakeConnection();

before(async function () {
  await populate();
})

const loginDetails = { email: "a@gmail.com", password: "123" };


let token;
let userId;


describe('Authentication',  () => {
  it("should handle invalid Username and password", (done: any) => {
    request.agent(app)
      .post(`/${version}/user/login`)
      .send({ email: "u@m.com", password: "456" })
      .expect(401)
      .then(done())
      .catch((err) => {
        done(err)
      })
  })
  it("this is for valid username & password and return a token",  (done: any) => {
     request.agent(app)
      .post(`/${version}/user/login`)
      .send(loginDetails)
      .expect(200)
      .then((res)=>{
        expect(res.body.token)
        token = res.body.token
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
});
describe('Create User',  () => {
  it("When any field is empty", (done: any) => {
    request.agent(app)
      .post(`/${version}/user/createUser`)
      .send({name: "", email: "", password: "", role: ""})
      .expect(401)
      .then(done())
      .catch((err) => {
        done(err)
      })
  })
})
it("This will return when User is Created", (done: any) => {
  request.agent(app)
    .post(`/${version}/user/createUser`)
    .send({name: "aman", email: "aman@gmail.com", password: "123", role: "user"})
    .expect(200)
    .then((res)=>{
      expect(res.body.data).to.have.property('_id')
      userId = res.body.data._id
      done()
    })
    .catch((err) => {
      done(err)
    })
})








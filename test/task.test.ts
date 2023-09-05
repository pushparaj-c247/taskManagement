import request from "supertest"
import app from "../index"
import jwt from 'jsonwebtoken';
import { fakeConnection } from "../src/config/db";
import {taskPopulate} from "../src/fakeDb/fakeDb";
import version from "../src/helper/constant";
import { expect } from "chai";

fakeConnection();

const adminDetails = { email: "b@gmail.com", password: "123", role: "admin"};

let token = "";
let taskId;

 
before(async()=>{
   await taskPopulate();
 token = jwt.sign({email: adminDetails.email, role: adminDetails.role},"ABcdefg",{
    expiresIn: "24h",
    algorithm: "HS256"
    
 })
});


describe('Create task',  () => {
   it("When any field is empty", (done) => {
     request.agent(app)
       .post(`/${version}/task/createTask`)
       .set('Authorization', `Bearer ${token}`)
       .send({subject: "", description: "", assignedTo: "", assignedBy: "",statusType: ""})
       .expect(401)
       .then(done())
       .catch((err) => {
        //  done(err)
        console.log(err);
        
       })
   })
 })
 it("This will for Created task", (done) => {
   request.agent(app)
     .post(`/${version}/task/createTask`)
     .set('Authorization', `Bearer ${token}`)
     .send({subject: "chapter", description: "my name is pushparaj", assignedTo: "64f1c2681dec204eee122838", assignedBy:"64f1c2681dec204eee122839",statusType: "pending",})
     .expect(200)
     .then((res)=>{
       expect(res.body._id)
       taskId = res.body._id
       done()
     })
     .catch((err) => {
       done(err)
     })
 })
 describe('Get All Task', () => {
  it("should get all Task", (done) => {
    request.agent(app)
      .get(`/${version}/task/getAllTask?search=pending&page=1&limit&1`)
      .set('Authorization', `Bearer ${token}`)
      .send({ columns: "statusType", pos :1})
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('docs')
        done()
      })
      .catch((err) => {
        done(err);
      });
  });
});




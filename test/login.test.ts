/* eslint-disable */
import request from "supertest"
import app from "../index"
import { fakeConnection } from "../src/config/db";
import { populate } from "../src/fakeDb/fakeDb";
import version from "../src/helper/constant";
import { expect } from "chai";

fakeConnection();

let admintoken: string;
let token: string;
let userId: string;

before(async function () {
  await populate();
})



const loginDetails = { email: "u@gmail.com", password: "123"};
const adminDetails = { email: "b@gmail.com", password: "123"};


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

       it("when i want only admin token",  (done: any) => {
        request.agent(app)
         .post(`/${version}/user/login`)
         .send(adminDetails)
         .expect(200)
         .then((res)=>{
           expect(res.body.token)
           admintoken = res.body.token
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
    .send({name: "aman", email: "aman@gmail.com", password: "123", role: "admin"})
    .expect(200)
    .then((res)=>{
      expect(res.body._id)
      userId = res.body._id
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe('Delete User', () => {
  it("should delete a user", (done: any) => {
    request.agent(app)
      .delete(`/${version}/user/deleteUser`)
      .set('Authorization', `Bearer ${token}`) // Set the authorization token
      .expect(200)
      .then((res) => {
        expect(res.text).to.equal("User Is Deleted Sucessfully");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('Update User', () => {
  it("should update a user", (done: any) => {
    const updatedUserData = { name: "Updated Name", email: "updated@example.com", role: "admin" };
    request.agent(app)
      .put(`/${version}/user/updateUser`)
      .set('Authorization', `Bearer ${token}`) 
      .send(updatedUserData)
      .expect(200)
      .then((res) => {
        expect(res.text).to.equal("User Is Updated Successfully");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('Get All Users', () => {
  it("should get all users", (done: any) => {
    request.agent(app)
      .get(`/${version}/user/getAllUser?search=admin&page=1&limit&1`)
      .set('Authorization', `Bearer ${admintoken}`)
      .send({ columns: "name", pos :1})
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
describe('Get One User', () => {
  it("should get one user", (done: any) => {
    request.agent(app)
      .get(`/${version}/user/getOneUser/${userId}`)
      .set('Authorization', `Bearer ${admintoken}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('_id', userId);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('role');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});










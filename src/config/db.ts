import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const NODE_ENV = process.env.NODE_ENV ?? "";

export function connections() {
  if (NODE_ENV == "dev") {
    mongoose
      .connect('mongodb://127.0.0.1:27017/User')
      .then(() => console.log("DB connected "))
      .catch(() => console.log("error in DB"));
  }

}
export function fakeConnection() {
  if (NODE_ENV == "testing") {
    mongoose
      .connect("mongodb://127.0.0.1:27017/testing")
      .then(() => console.log("DB connected fake "))
      .catch(() => console.log("error in fake DB"));
  }
}

import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_URL, FAKE_URL} from "../config/env"
dotenv.config();
const NODE_ENV = process.env.NODE_ENV ?? "";

export function connections() {
  if (NODE_ENV == "dev") {
    mongoose
      .connect(DB_URL)
      .then(() => console.log("DB connected "))
      .catch(() => console.log("error in DB"));
  }

}
export function fakeConnection() {
  if (NODE_ENV == "testing") {
    mongoose
      .connect(FAKE_URL)
      .then(() => console.log("DB connected fake "))
      .catch(() => console.log("error in fake DB"));
  }
}

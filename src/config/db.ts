import mongoose from "mongoose";
import { DB_URL } from "./env";

export function connections() {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("DB connected "))
    .catch(() => console.log("error in DB"));


}
export function fakeConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/testing")
    .then(() => console.log("DB connected fake "))
    .catch(() => console.log("error in fake DB"));
}

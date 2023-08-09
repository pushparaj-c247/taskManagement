import express from "express";
import mongoose from "mongoose";
import userRoute from "./src/Routes/userRoute";
import taskRoute from "./src/Routes/taskRoute";

const app = express();
const port = 4000;
app.use(express.urlencoded());
app.use(express.json());

const connection = async () => {
  try {
     await mongoose.connect("mongodb://127.0.0.1:27017/User");
    console.log("sucess db");
  } catch (error) {
    console.log("error in db");
  }
};
connection();


app.use("/user", userRoute);

app.use("/task", taskRoute);

app.listen(port, () => {
  console.log("server is started");
});

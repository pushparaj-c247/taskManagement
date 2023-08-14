import express from "express";
import userRoute from "./src/Routes/userRoute";
import taskRoute from "./src/Routes/taskRoute";
import  connections  from "./src/config/db";

const app = express();
const port = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connections();


app.use("/user", userRoute);

app.use("/task", taskRoute);

app.listen(port, () => {
  console.log("server is started");
});

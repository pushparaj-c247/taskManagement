import express from "express";
import userRoute from "./src/Routes/userRoute";
import taskRoute from "./src/Routes/taskRoute";
import connections from "./src/config/db";
import { port } from "./src/config/env";
import passport from "./src/config/passport";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

connections();

app.use("/user", userRoute);

app.use("/task", taskRoute);

app.listen(port, () => {
  console.log("server is started");
});

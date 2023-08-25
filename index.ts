import express from "express";
import userRoute from "./src/Routes/userRoute";
import taskRoute from "./src/Routes/taskRoute";
import connections from "./src/config/db";
import { port } from "./src/config/env";
import passport from "./src/config/passport";
import errorHandler from "./src/middleware/errorHandler";
import errorLast from './src/middleware/errorLast'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

connections();

app.use("/user", userRoute);
app.use("/task", taskRoute);
app.use(errorHandler);
app.use(errorLast);

app.listen(port, () => {
  console.log("server is started");
});

import express from "express";
import { router, routers } from "./src/Routes/index";
import connections from "./src/config/db";
import { port } from "./src/config/env";
import { passport, errorHandler, errorLast } from "./src/middleware/index"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

connections();

app.use("/user", routers);
app.use("/task", router);
app.use(errorHandler);
app.use(errorLast);

app.listen(port, () => {
  console.log("server is started");
});

import express from "express";
import { router, routers } from "./src/Routes/index";
import {connections} from "./src/config/db";
import { port } from "./src/config/env";
import { passport, errorHandler, errorLast } from "./src/middleware/index"
import version from "./src/helper/constant";
import responseTime from 'response-time';
export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

connections();
app.use(responseTime());
app.use(`/${version}/user`, routers);
app.use(`/${version}/task`, router);
app.use(errorHandler);
app.use(errorLast);

app.listen(port, () => {
  console.log("server is started");
});

export default app
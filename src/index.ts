import { AppDataSource } from "./data-source";
import { Users } from "./entity/Users";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

const indexRouter = require("./routers/index");
const secondRouter = require("./routers/second");
// import * as indexRouter from "./routers/index";
console.log('11===========',indexRouter);

dotenv.config();
const app = express();
app.use(express.json());
app.use("/", indexRouter);
app.use("/second", secondRouter);
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("INIT DATABASE.======================================");
  
    // const user = new Users()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  
  })
  .catch((error) => console.log(error));

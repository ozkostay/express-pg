import { AppDataSource } from "./data-source";
import { Users } from "./entity/Users";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import testInt from "./interfaces/testInt";
const indexRouter = require("./routers/index");
// import * as indexRouter from "./routers/index";
console.log('11===========',indexRouter);

dotenv.config();
const app = express();
app.use(express.json());
app.use("/", indexRouter);
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("INIT DATABASE.======================================");
    // console.log("Inserting a new user into the database...")
    // const user = new Users()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // // const users = await AppDataSource.manager.find(Users)
    // const users = await AppDataSource.manager.find('users')
    // console.log("Loaded users: ", users)

    

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

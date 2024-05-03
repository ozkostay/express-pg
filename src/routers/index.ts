import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./../data-source";
import testInt from "../interfaces/testInt";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const w2: testInt = {
    name: "MyName",
    age: 23,
    bool: true,
  };
  const words: string = `Express + TypeScript Server2 ${w2.name} ${w2.age} ${w2.bool}`;
  const users3 = await AppDataSource.manager.find('users');
  console.log("Loaded users===: ", users3);

  // res.json(users3);
  res.json(words);
});

module.exports = router;
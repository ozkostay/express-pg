import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./../data-source";
import testInt from "../interfaces/testInt";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { verify } from "crypto";
import { param, body, validationResult, matchedData } from "express-validator";

const router = express.Router();

router.get("/man", async (req: Request, res: Response) => {
  // For checking TypeScript
  const w2: testInt = {
    name: "MyName",
    age: 23,
    bool: true,
  };
  const words: string = `Express + TypeScript Server2 ${w2.name} ${w2.age} ${w2.bool}`;
  const users = await AppDataSource.manager.find("users");
  console.log("Loaded users===: ", users);
  res.json(users);
});

router.get("/rep", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(Users).find();
  res.json(users);
});

router.get("/raw", async (req: Request, res: Response) => {
  const users = await AppDataSource.query("select * from users");
  res.json(users);
});

router.get(
  "/qbilder/:idparam",
  param("idparam").isInt(),
  async (req: Request, res: Response) => {
    // Validation that :idparam is Integer
    const result = validationResult(req);
    let data: { idparam?: number };
    if (!result.isEmpty()) {
      data = matchedData(req);
      return res
        .status(200)
        .json(`Hello!!! param=${data.idparam} it doesn't have to be a string!`);
    }

    const users = await AppDataSource.createQueryBuilder()
      .select()
      .from(Users, "us")
      .where("us.id > :idparam", { idparam: data.idparam })
      .getRawMany();

    res.json(users);
  }
);

module.exports = router;

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./../data-source";
import testInt from "../interfaces/testInt";
import { Users } from "../entity/Users";
import {
  param,
  body,
  validationResult,
  matchedData,
  Result,
} from "express-validator";

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
  param("idparam").trim().isInt().withMessage("your is not Integer!!!"),
  async (req: Request, res: Response) => {
    // Validation that :idparam is Integer
    let data: { idparam?: number } = matchedData(req);
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json(result.array());
    }

    console.log("44444", data.idparam);
    const users = await AppDataSource.createQueryBuilder()
      .select()
      .from(Users, "us")
      .where("us.id > :idparam", { idparam: data.idparam })
      .getRawMany();

    res.json(users);
  }
);

module.exports = router;

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import testInt from "./interfaces/testInt";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  // const words: string = "Express + TypeScript Server2";
  const w2: testInt = {
    name: 'MyName',
    age: 23,
    bool: true,
  }
  const words: string = `Express + TypeScript Server2 ${w2.name} ${w2.age} ${w2.bool}`;

  res.send(words);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

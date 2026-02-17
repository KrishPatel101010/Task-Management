import express, { type Application } from "express";
import dotenv from "dotenv";
import db from "./config/db.ts";

dotenv.config();
db();

const PORT = process.env.PORT;

const app: Application = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});

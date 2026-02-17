import express, { type Application } from "express";
import dotenv from "dotenv";
import db from "./config/db.ts";
import { authRouter ,taskRouter} from "./routes/index.ts";
import cors from "cors";
dotenv.config();
db();

const PORT = process.env.PORT;

const app: Application = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use("/",authRouter);
app.use("/tasks",taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});

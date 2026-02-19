import express, { Router } from "express";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController
} from "../controllers/index.ts";
import {taskValidator} from "../middlewares/index.ts";

const router: Router = express.Router();

router.get("/", getTasksController);
router.post("/", taskValidator, addTaskController);
router.put("/:id", taskValidator,updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;

import express, { Router } from "express";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController
} from "../controllers/index.ts";

const router: Router = express.Router();

router.get("/", getTasksController);
router.post("/", addTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;

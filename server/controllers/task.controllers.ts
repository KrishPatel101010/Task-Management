import {
  getTasksService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/index.ts";
import type { Request, Response } from "express";

export const getTasksController = async (_req: Request, res: Response) => {
  try {
    const tasks = await getTasksService();
    res.status(201).json({ Tasks: tasks });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

export const addTaskController = async (req: Request, res: Response) => {
  try {
    const newTask = await addTaskService(req.body);
    res.status(201).json({ message: "Task created successfully." , NewTask : newTask});
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res.status(201).json({ Error: "Please provide Id." });
    const updatedTask = await updateTaskService(String(req.params.id), req.body);
    res.status(201).json({ Message: "Task updated successfully." , UpdatedTask : updatedTask});
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res.status(201).json({ Error: "Please provide Id." });
    await deleteTaskService(String(req.params.id));
    res.status(201).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

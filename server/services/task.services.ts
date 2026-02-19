import { Task, User } from "../models/index.ts";
import mongoose from "mongoose";
interface Data {
  title: string;
  description?: string;
  status: string;
  dueDate: Date;
  userId: string;
}

export const getTasksService = async () => {
  const tasks = await Task.find();
  if (tasks.length === 0) throw new Error("No task found.");
  return tasks;
};

export const addTaskService = async (data: Data) => {
  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    throw new Error("Couldn't find user.");
  }
  const userExist = await User.findById(data.userId);

  if (!userExist) throw new Error("Couldn't find user.");
  const newTask = await Task.create({ ...data });
  return newTask;
};

export const updateTaskService = async (taskId: string, data: Data) => {
  const userExist = await User.findById(data.userId);
  if (!userExist) throw new Error("Couldn't find user.");
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, {returnDocument : "after"});
  if (!updatedTask) throw new Error("Counldn't find task.");
  return updatedTask;
};

export const deleteTaskService = async (taskId: string) => {
  const taskExist = await Task.findByIdAndDelete(taskId);
  if (!taskExist) throw new Error("Task doen't exist.");
};

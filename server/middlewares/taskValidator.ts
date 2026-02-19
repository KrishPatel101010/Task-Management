import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const taskSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["Pending", "In-Progress", "Completed"]),
    dueDate: z.coerce.date(),
    userId: z.string(),
  }),
});

const taskValidator = (req: Request, res: Response, next: NextFunction) => {
  const result = taskSchema.safeParse({ body: req.body });

  if (!result.success) {
    return res.status(400).json({ message: result.error.message });
  }
  Object.assign(req, result.data);
  next();
};
export default taskValidator;

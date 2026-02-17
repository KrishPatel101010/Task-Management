import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, requied: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    required: true,
  },
  dueDate: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", requied: true },
});

export const Task = model("Tasks", TaskSchema);

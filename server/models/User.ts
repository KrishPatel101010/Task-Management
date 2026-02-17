import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: [5, "Password must be 5 characters long"],
  },
});

export const User = model("users", UserSchema);

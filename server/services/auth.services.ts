import bcrypt from "bcrypt";
import { User } from "../models/index.ts";

export const signUpService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  if (!data.email) throw new Error("Email not provided");
  if (!data.password) throw new Error("Password not provided");
  const userExist = await User.findOne({ email: data.email });
  if (userExist) throw new Error("Email already exist.");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
};

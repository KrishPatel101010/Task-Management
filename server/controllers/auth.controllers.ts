import { signUpService, loginService } from "../services/index.ts";
import type { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
  try {
    await signUpService(req.body);
    res.status(201).json({ message: "Sign up successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Could not sign up.", error: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const token = await loginService(req.body);
    res.status(201).json({ message: "Login successfully", token: token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Could not login.", error: (error as Error).message });
  }
};

import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(400).json({ message: "Please provide header." });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Please provide token." });
  if (!process.env.JWT_SECRET_KEY)
    return res.status(400).json({ message: "Secret key not found." });
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = result;
  } catch (error) {
    return res.status(400).json({ message: "Invalid token or expired token." });
  }
  next();
};

export default jwtAuth;

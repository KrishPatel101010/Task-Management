import jwt from "jsonwebtoken";

const generateToken = (payload: { email: string }) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!SECRET_KEY) throw new Error("Secret key not found.");
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export default generateToken;

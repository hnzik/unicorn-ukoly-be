import { User } from "./type";
import jwt from "jsonwebtoken";

const createJWT = (user: User) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not set");
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.name,
    },
    secret,
    { expiresIn: "1d" }
  );
};

const verifyJWT = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not set");
  }

  return jwt.verify(token, secret);
};

export { createJWT, verifyJWT };

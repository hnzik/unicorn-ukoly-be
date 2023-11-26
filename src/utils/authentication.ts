import { IReq, UserType } from "./type";
import jwt from "jsonwebtoken";

const createJWT = (user: UserType) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not set");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: "1d" }
  );
};

const verifyJWT = (token: string) => {
  const secret = process.env.JWT_SECRET;

  console.log("secret", secret);
  console.log("token", token);

  if (!secret) {
    throw new Error("JWT_SECRET not set");
  }

  return jwt.verify(token, secret);
};

const getJwtFromHeader = (req: IReq<any>) => {
  let jwt = req.headers.authorization;

  if (!jwt) return null;

  jwt = req.headers.authorization?.split(" ")[1];

  return jwt;
}

export { getJwtFromHeader, createJWT, verifyJWT };

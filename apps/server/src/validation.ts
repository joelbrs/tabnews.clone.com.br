import { Types } from "mongoose";
import { env } from "./config";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "./exceptions";

export const validateJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_KEY);
    return decoded as { username: string; subId: Types.ObjectId };
  } catch {
    throw new UnauthorizedException();
  }
};

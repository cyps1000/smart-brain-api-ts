import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

/**
 * Defines the user payload
 */
interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string | Date;
  avatar: string;
  score: number;
}

/**
 * Defines the token interface
 */
export interface Token {
  id: string;
  iat: number;
  exp: number;
}

/**
 * Declares the current user as part of the req object globally
 */
declare global {
  namespace Express {
    interface Request {
      token?: Token;
      currentUser?: UserPayload;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * Gets the token from the header
   */
  const token = req.header("x-auth-token");

  /**
   * Checks if there's a token
   */
  if (!token) {
    return res.status(401).send({ msg: "Authorization denied." });
  }

  /**
   * Checks if there is a token
   */
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as Token;

    req.token = payload;

    /**
     * Searches for the user in the db
     */
    const user = await User.findById(req.token.id);

    if (!user) {
      return res.status(404).send({ msg: "Authorization denied." });
    }

    req.currentUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      avatar: user.avatar,
      score: user.score
    };

    next();
  } catch (error) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};

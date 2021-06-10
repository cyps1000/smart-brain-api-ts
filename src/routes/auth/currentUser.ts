import { Request, Response, RequestHandler } from "express";
import { auth } from "../../middlewares/auth";

/**
 * Imports models
 */
import { User } from "../../models/User";

/**
 * Handles geteting the current user
 */
const getCurrentUser = async (req: Request, res: Response) => {
  const { token } = req;
  /**
   * Checks if there's a token
   */
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied." });
  }

  const user = await User.findById(token.id);
  if (user) return res.send(user);
};

/**
 * Defines the controller
 */
const currentUserController: RequestHandler[] = [auth, getCurrentUser];

export { currentUserController };

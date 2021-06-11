import { Request, Response, RequestHandler } from "express";
import { auth } from "../../middlewares/auth";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Handles the current user's profile
 */
const getCurrentProfile = async (req: Request, res: Response) => {
  /**
   * Searches for the user
   */
  const user = await User.findById(req.currentUser!.id);

  if (!user) {
    return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
  }

  res.send(user);
};

/**
 * Defines the controller
 */
const getCurrentProfileController: RequestHandler[] = [auth, getCurrentProfile];

export { getCurrentProfileController };

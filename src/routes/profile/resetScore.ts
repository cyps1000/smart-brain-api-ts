import { Request, Response, RequestHandler } from "express";
import { auth } from "../../middlewares/auth";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Handles resetting the user's score
 */
const resetScore = async (req: Request, res: Response) => {
  /**
   * Checks if user exists
   */
  const user = await User.findById(req.currentUser!.id);

  if (!user) return res.send({ msg: "Authorization denied" });

  user.score = 0;

  await user.save();

  res.send({ score: user.score, msg: "Score was reset to 0" });
};

/**
 * Defines the controller
 */
const resetScoreController: RequestHandler[] = [auth, resetScore];

export { resetScoreController };

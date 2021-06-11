import { Request, Response, RequestHandler } from "express";
import { auth } from "../../middlewares/auth";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Handles getting all the profiles
 */
const getProfiles = async (req: Request, res: Response) => {
  const profiles = await User.find({});

  res.send(profiles);
};

/**
 * Defines the controller
 */
const getProfilesController: RequestHandler[] = [auth, getProfiles];

export { getProfilesController };

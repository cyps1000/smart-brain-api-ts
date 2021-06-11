import { Request, Response, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { auth } from "../../middlewares/auth";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Defines the request validation middleware
 */
const requestValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please provide your first name"),
  body("lastName").not().isEmpty().withMessage("Please provide your last name"),
  body("avatar")
    .not()
    .isEmpty()
    .isURL()
    .withMessage("Please provide an avatar URL")
];

/**
 * Handles updating the profile
 */
const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { firstName, lastName, avatar } = req.body;

  /**
   * Checks if the user exists
   */
  const user = await User.findOne({ _id: req.currentUser!.id });

  if (!user) {
    return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
  }

  /**
   * Checks if the image exists
   */

  user.firstName = firstName;
  user.lastName = lastName;
  user.avatar = avatar;

  await user.save();

  res.send(user);
};

/**
 * Defines the controller
 */
const updateProfileController: RequestHandler[] = [
  auth,
  ...requestValidation,
  updateProfile
];

export { updateProfileController };

import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Defines the request validation middleware
 */
const requestValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please provide your first name"),
  body("lastName").not().isEmpty().withMessage("Please provide your last name"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters")
];

/**
 * Handles registering an user
 */
const regiserUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  /**
   * Checks if the user exists
   */
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ errors: errors.array() });
  }

  /**
   * Creates the user
   */
  const user = User.build({ firstName, lastName, email, password });
  await user.save();

  /**
   * Defines the paylaod
   */
  const payload = {
    id: user.id
  };

  /**
   * Creates a token
   */
  const jwtToken = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: 3600 });

  res.status(201).send({ token: jwtToken });
};

/**
 * Defines the controller
 */
const registerController: RequestHandler[] = [
  ...requestValidation,
  regiserUser
];

export { registerController };

import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

/**
 * Imports Services
 */
import { PasswordManager } from "../../services/password-manager";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Defines the request validation middleware
 */
const requestValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must provide a password")
];

/**
 * Handles authenticating the user
 */
const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  /**
   * Checks if the user exists
   */
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }

  /**
   * Checks if the provided password is correct
   */
  const passwordsMatch = await PasswordManager.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
  }

  /**
   * Defines the payload
   */
  const payload = {
    id: existingUser.id
  };

  /**
   * Creates a token
   */
  const jwtToken = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: 3600 });

  res.send({ token: jwtToken });
};

/**
 * Defines the controller
 */
const loginController: RequestHandler[] = [...requestValidation, loginUser];

export { loginController };

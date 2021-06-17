import { Request, Response, RequestHandler } from "express";
import Clarifai from "../../clarifai";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { auth } from "../../middlewares/auth";

/**
 * Imports User model
 */
import { User } from "../../models";

/**
 * Enables access to .env
 */
dotenv.config();

/**
 * Init Clarifai API
 */
const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});

/**
 * Defines the request validation middleware
 */
const requestValidation = [
  body("input")
    .not()
    .isEmpty()
    .isURL()
    .withMessage("Please provide a valid URL")
];

/**
 * Handles detecting faces
 */
const detectFaces = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { input } = req.body;

  /**
   * Checks if the user exists
   */
  const user = await User.findOne({ _id: req.currentUser!.id });

  if (!user) {
    return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
  }

  /**
   * Handles detecting the face
   */
  const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);

  if (data.status.code !== 10000) {
    return res
      .status(400)
      .send({ errors: [{ msg: "Unable to work with API" }] });
  }

  /**
   * Handles storing the outputs
   */
  const entries = data.outputs[0].data.regions.length;
  const outputs = data.outputs;

  user.score += entries;

  await user.save();

  res.send({ score: user.score, outputs });
};

/**
 * Defines the controller
 */
const detectFacesController: RequestHandler[] = [
  auth,
  ...requestValidation,
  detectFaces
];

export { detectFacesController };

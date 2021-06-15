import express from "express";

/**
 * External Imports
 */
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

/**
 * Imports routes
 */
import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";
import { faceDetectRouter } from "./routes/image";

/**
 * Enables access to .env
 */
dotenv.config();

/**
 * Creates the express server
 */
const app = express();

/**
 * Init Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

/**
 * Auth Router
 */
app.use(authRouter);

/**
 * Profile Router
 */
app.use(profileRouter);

/**
 * Face Detect
 */
app.use(faceDetectRouter);

export { app };

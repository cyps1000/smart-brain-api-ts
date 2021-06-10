import express from "express";
import { registerController } from "./register";
import { loginController } from "./login";
import { currentUserController } from "./currentUser";
import { deleteUserController } from "./deleteUser";

/**
 * Defines the router
 */
const router = express.Router();

/**
 * Register User
 */
router.post("/api/auth/register", registerController);

/**
 * Login User
 */
router.post("/api/auth/login", loginController);

/**
 * Current User
 */
router.get("/api/auth", currentUserController);

/**
 * Delete User
 */
router.delete("/api/users", deleteUserController);

export { router as authRouter };

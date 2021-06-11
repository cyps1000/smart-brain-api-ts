import express from "express";
import { updateProfileController } from "./updateProfile";
import { getCurrentProfileController } from "./getProfile";
import { getProfilesController } from "./getProfiles";
import { resetScoreController } from "./resetScore";

/**
 * Defines the router
 */
const router = express.Router();

/**
 * Get Current user profile
 */
router.get("/api/profile/me", getCurrentProfileController);

/**
 * Get all user profiles
 */
router.get("/api/profiles", getProfilesController);

/**
 * Update profile
 */
router.put("/api/profile", updateProfileController);

/**
 * Reset Score
 */
router.delete("/api/profile/score", resetScoreController);

export { router as profileRouter };

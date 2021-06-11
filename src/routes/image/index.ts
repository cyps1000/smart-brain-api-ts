import express from "express";
import { detectFacesController } from "./face-detect";

/**
 * Defines the router
 */
const router = express.Router();

/**
 * Face Detect
 */
router.put("/api/face-detect", detectFacesController);

export { router as faceDetectRouter };

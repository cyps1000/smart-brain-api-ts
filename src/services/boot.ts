import { Express } from "express";
import mongoose from "mongoose";

/**
 * Defines the port the app will run on
 */
const PORT = process.env.PORT || 5000;

/**
 * Handles booting up the server.
 */
export const bootServer = async (app: Express) => {
  /**
   * Checks for the JWT_KEY
   */
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined.");
  }

  /**
   * Checks for the MONGO_URI
   */
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined.");
  }

  /**
   * Checks for the API_KEY
   */
  if (!process.env.API_KEY) {
    throw new Error("Clarifai API_KEY must be defined.");
  }

  /**
   * Connects to the Database
   */
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log("Connection to MongoDB successful.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

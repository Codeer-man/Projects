import mongoose from "mongoose";
import logger from "../utils/logger.js";

const URI =
  (process.env.MONGODB_URI as string) || "mongodb://localhost:27017/user";

export default async function connectDB() {
  if (!URI) {
    logger.error("URI not found or matched");
    return console.error("URI not found");
  }

  try {
    await mongoose.connect(URI);
    console.log("Connected To database");
    logger.info("Connected to database");
  } catch (error) {
    console.error("Database error", error);
    logger.error(`DB error ${error}`);
    process.exit(1);
  }
}

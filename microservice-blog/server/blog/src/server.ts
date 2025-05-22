import express = require("express");
import dotenv from "dotenv";
import logger from "./utils/logger";
import blogRoutes from "./routes/blog";
import { Redis } from "ioredis";
dotenv.config();

const app = express();

export const redisClient = new Redis(process.env.REDIS_URL!);

const PORT = process.env.PORT || 5002;

app.use(express.json());

app.use("/api/v1", blogRoutes);

app.listen(PORT, () => {
  logger.info("Connecting to Redis...");
  logger.info(`Server is running on port ${PORT}`);
});

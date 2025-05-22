import express, { NextFunction, Request, Response } from "express";
import logger from "./utils/logger";
import dotenv from "dotenv";
import { sql } from "./config/db";
import blogRouter from "./routes/blog";
import errorHandler from "./middleware/errorhandler.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
async function initdb() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS blogs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(50) NOT NULL,
            blogContent TEXT NOT NULL,
            image VARCHAR(225) NOT NULL,
            public_id VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            author VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    await sql`
        CREATE TABLE IF NOT EXISTS comment(
            id SERIAL PRIMARY KEY,
            comment VARCHAR(50) NOT NULL,
            description VARCHAR(50) NOT NULL,
            userId TEXT NOT NULL,
            username VARCHAR(225) NOT NULL,
            blogId VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    await sql`
        CREATE TABLE IF NOT EXISTS saveBlog(
            id SERIAL PRIMARY KEY,
            userId TEXT NOT NULL,
            blogId VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    logger.info("Database initialized successfully");
  } catch (error) {
    logger.warn("Error while initializing database", error);
  }
}

app.use("/api/v1", blogRouter);

app.use(errorHandler);

initdb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    logger.error(
      "Error while connecting to the database or creating tables",
      err
    );
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  logger.error("error in the process", err);
});

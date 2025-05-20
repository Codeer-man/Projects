import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";

import UserRoute from "./routes/user.routes.js";
import errorhanlder from "./middleware/errorhandler.middleware.js";
import logger from "./utils/logger.js";
import helmet from "helmet";
import connectDB from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

connectDB();

app.use("/api/v1", UserRoute);

app.use(errorhanlder);

app.listen(PORT, () => {
  logger.info(`User service is running on PORT ${PORT}`);
  console.log(`Server listening to port http://localhost:${PORT}`);
});

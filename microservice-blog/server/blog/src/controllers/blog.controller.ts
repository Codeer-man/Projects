import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { sql } from "../config/db";
import axios from "axios";
import { redisClient } from "../server";



export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info("Get all blogs hitPoint...");
  try {
    const { searchQuery = "", category = "" } = req.query;

    const cacheKey = `blogs:${searchQuery}:${category}}`;
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      logger.info("Cache found");
      res.status(200).json(JSON.parse(cacheData));
      return;
    }
    let blog;

    if (searchQuery && category) {
      blog = await sql`
        SELECT * FROM blogs WHERE (title ILIKE ${
          "%" + searchQuery + "%"
        } OR description ILIKE ${"%" + searchQuery + "%"} )
        AND category = ${category} ORDER BY createdat DESC
        `;
    } else if (searchQuery) {
      blog = await sql`
            SELECT * FROM blogs WHERE title ILIKE ${
              "%" + searchQuery + "%"
            } OR description ILIKE ${
        "%" + searchQuery + "%"
      } ORDER BY createdat DESC
        `;
    } else if (category) {
      blog = await sql`
            SELECT * FROM blogs WHERE category = ${category} ORDER BY createdat DESC
        `;
    } else {
      blog = await sql`
    SELECT * FROM blogs ORDER BY createdat DESC
    `;
    }

    logger.info("saving to redis");
    await redisClient.setex(cacheKey, 60 * 5, JSON.stringify(blog));

    logger.info(`Found ${blog} blogs`);
    res.json(blog);
  } catch (error) {
    logger.error("Error while getting all blogs", error);
    next(error);
  }
};

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Get single blog hitPoint...");
  try {
    const { id } = req.params;

    const cacheKey = `Blog"${id}`;
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      logger.info("Cache found");
      res.status(200).json(JSON.parse(cacheData));
      return;
    }

    const blog = await sql`
    SELECT * FROM blogs WHERE id=${id}
    `;
    console.log(process.env.AUTH_URL);

    const { data } = await axios.get(
      `${process.env.AUTH_URL}/api/v1/user/${blog[0].author}`
    );

    const blogData = { blog: blog[0], author: data };

    await redisClient.setex(cacheKey, 60 * 5, JSON.stringify(blogData));

    res.json({ blog: blog[0], author: data });
  } catch (error) {
    logger.error("Error while getting a single blog", error);
    next(error);
  }
};

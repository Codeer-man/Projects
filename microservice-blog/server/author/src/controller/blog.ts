import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import ErrorHanldling from "../utils/errorhanlding";
import getBuffer from "../utils/dataUri";
import logger from "../utils/logger";
import cloudinary, { deleteFromCloudinary } from "../config/cloudinary";
import { sql } from "../config/db";

export const createBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, blogContent, category } = req.body;

    const file = req.file;

    if (!file) {
      throw new ErrorHanldling("Please upload a blog image", 401, false);
    }

    const filebuffer = getBuffer(file);

    if (!filebuffer || !filebuffer.content) {
      throw new ErrorHanldling("failed to generate buffer", 401, false);
    }

    const uploadToCloudinary = await cloudinary.uploader.upload(
      filebuffer.content,
      {
        folder: "blogs",
      }
    );

    const result = await sql`
    INSERT INTO blogs (title,description,image,public_id,blogContent,category,author)
    VALUES (${title},${description},${uploadToCloudinary.secure_url} ,${uploadToCloudinary.public_id},${blogContent} ,${category}, ${req.user?.id}) 
      RETURNING *`;

    logger.info(`New Blog created by user with id ${req.user?.id}`);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Error in creating blog", error);
    next(error);
  }
};

export const updateBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  logger.info("update blog endpoint hit ...");
  try {
    const { id } = req.params;
    const file = req.file;
    const { title, description, blogContent, category } = req.body;

    if (!id) {
      throw new ErrorHanldling("please provide an id", 500, false);
    }

    const blog = await sql`SELECT * FROM blogs WHERE id = ${id} 
      `;

    if (!blog.length) {
      throw new ErrorHanldling("blog not found", 404, false);
    }

    if (blog[0].author !== req.user?.id) {
      throw new ErrorHanldling(
        "you are not authorized to update this blog",
        403,
        false
      );
    }

    let imageUrl = blog[0].image;
    let Updated_publicId = blog[0].public_id;

    if (file) {
      const fileBuffer = getBuffer(file);

      if (!fileBuffer || !fileBuffer.content) {
        throw new ErrorHanldling("Failed to generate buffer", 401, false);
      }

      await deleteFromCloudinary(blog[0].public_id);

      const updateImage = await cloudinary.uploader.upload(fileBuffer.content, {
        folder: "blogs",
      });

      imageUrl = updateImage.secure_url;
      Updated_publicId = updateImage.public_id;
    }

    const updatedBlog = await sql` UPDATE blogs SET
    title = ${title || blog[0].title},
    description = ${description || blog[0].description},
    image = ${imageUrl || blog[0].image},
    public_id = ${Updated_publicId || blog[0].public_id},
    blogContent = ${blogContent || blog[0].blogcontent},
    category = ${category || blog[0].category}

    WHERE id = ${id}
    RETURNING *
    `;

    logger.info(`Blog updated by user with id ${req.user?.id}`);
    res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    logger.error("Error in updating blog", error);
    next(error);
  }
};

export const deleteBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  logger.info("delete blog endpoint hit ...");
  try {
    const { id } = req.params;

    const userBlog = await sql`
    SELECT * FROM blogs WHERE id = ${id}
    `;

    if (userBlog[0].author !== req.user?.id) {
      throw new ErrorHanldling(
        "You are not authorized to delete this blog",
        403,
        false
      );
    }

    await deleteFromCloudinary(userBlog[0].public_id);
    await sql`
    DELETE FROM saveBlog WHERE blogid = ${id}
    `;
    await sql`
    DELETE FROM comment WHERE blogid = ${id}
    `;
    const deleteBlog = await sql`
  DELETE FROM blogs WHERE id = ${id}
  RETURNING *
  `;

    logger.info(`Blog deleted by user with id ${req.user?.id}`);
    res.status(200).json({
      success: true,
      data: deleteBlog,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    logger.error("Error in deleting blog", error);
    next(error);
  }
};

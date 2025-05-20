import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";
import ErrorHandling from "../utils/ErrorHandling.js";
import User from "../model/User.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/trycatch.js";
import { AuthRequest } from "../middleware/auth.middeware.js";
import getBuffer from "../utils/dataUri.js";

import { Types } from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { deleteFromCloudinary } from "../lib/cloudinary.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("User login endpoint hit...");
  try {
    const { email, name, image } = req.body;

    if (!email || !name || !image) {
      throw new ErrorHandling("Please provide all the fields", 401, false);
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name,
        image,
      });
      await user.save();
    }

    const { accessToken, refreshToken } = await generateToken({
      id: user._id.toString(),
      username: user.name,
    });

    res.status(201).json({
      status: true,
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error("Invalid server error", error);
    next(error);
  }
};

export const myProfile = TryCatch(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    logger.info("My profile endpoint hit...");

    const user = req.user;

    const findUser = await User.findById(user?.id);
    logger.info(`User ${user?.name} found`);
    res.json(findUser);
  }
);

export const GetUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Get user profile endpoint hit...");
  try {
    const { userId } = req.params;

    const finduser = await User.findById(userId);

    if (!finduser) {
      throw new ErrorHandling("User not found", 404, false);
    }

    res.json(finduser);
  } catch (error) {
    logger.error("Error while getting user profile", error);
    next(error);
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  logger.info("Update user profile endpoint hit...");

  try {
    const { name, bio, instagram, linkedin, facebook } = req.body;

    if (!name && !bio && !instagram && !linkedin && !facebook) {
      throw new ErrorHandling(
        "Please provide at least one field to update",
        400,
        false
      );
    }

    if (!req.user) {
      throw new ErrorHandling("User not authenticated", 401, false);
    }

    const fieldsToUpdate: Record<string, string> = {};
    if (name) fieldsToUpdate.name = name;
    if (bio) fieldsToUpdate.bio = bio;
    if (instagram) fieldsToUpdate.instagram = instagram;
    if (linkedin) fieldsToUpdate.linkedin = linkedin;
    if (facebook) fieldsToUpdate.facebook = facebook;

    const updateProfile = await User.findByIdAndUpdate(
      req.user.id as Types.ObjectId,
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!updateProfile) {
      throw new ErrorHandling("User not found", 404, false);
    }

    res.status(200).json(updateProfile);
  } catch (error) {
    logger.error("Error while updating user profile", error);
    next(error);
  }
};

export const updateProfileImage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  logger.info("Update profile image endpoint hit...");
  try {
    const file = req.file;

    if (!file) {
      throw new ErrorHandling("No file uploaded", 400, false);
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new ErrorHandling("File buffer is empty", 500, false);
    }

    if (!req.user) {
      throw new ErrorHandling("Authentication is required", 429, false);
    }

    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
      throw new ErrorHandling("User not found", 404, false);
    }

    if (existingUser.public_id) {
      await deleteFromCloudinary(existingUser.public_id);
    }

    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
      folder: "blogs",
    });

    if (!req.user) {
      throw new ErrorHandling("User not authenticated", 401, false);
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image: cloud.secure_url, public_id: cloud.public_id },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    logger.error("Error while updating profile image", error);
    next(error);
  }
};

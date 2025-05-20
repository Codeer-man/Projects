import cloudinary from "../config/cloudinary.js";

export const deleteFromCloudinary = async (public_id: string) => {
  const deleteImage = await cloudinary.uploader.destroy(public_id);
  return deleteImage;
};

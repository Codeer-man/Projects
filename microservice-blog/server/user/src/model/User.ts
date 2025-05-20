import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
  public_id: string;
}

const schema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    },
    instagram: String,
    facebook: String,
    linkedin: String,
    bio: String,
    public_id: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", schema);

export default User;

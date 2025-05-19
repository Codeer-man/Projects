import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface userData {
  id: string;
  username: string;
}

const generateToken = async (user: userData) => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
  const refreshTokenSecret = process.env.JWT_REFRESH_KEY;

  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    accessTokenSecret as string,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    refreshTokenSecret as string,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateToken;

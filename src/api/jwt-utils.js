import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();

// function to create a token
export function createToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.cookie_password, options);
}

// function to decode a token
export function decodeToken(token) {
  const userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.cookie_password);
    userInfo.userId = decoded.userId;
    userInfo.email = decoded.email;
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

// function to validate a token by checking decoded token against user in database
export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.userId);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

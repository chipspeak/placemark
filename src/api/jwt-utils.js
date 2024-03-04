import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();

// function to create a token
export function createToken(user) {
  // declaring the default role as user
  let role = "user";

  // if the user is the admin, set the role to admin
  if (user.email === process.env.email) {
    role = "admin";
  }

  // declare the payload minus an id to account for admin
  const payload = {
    email: user.email,
    role: role,
  };

  // include userId in payload only if the user is not an admin
  if (role !== "admin") {
    payload.userId = user._id;
  }

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
    userInfo.email = decoded.email;
    userInfo.role = decoded.role;
    if (decoded.userId) {
      userInfo.userId = decoded.userId;
    }
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

// function to validate a token by checking decoded token against user in database
export async function validate(decoded, request) {
  let user;
  if (decoded.role === "admin") {
    // if the decoded token corresponds to an admin, check admin details
    user = {
      email: process.env.admin_email,
      password: process.env.admin_password
    };
  } else {
    // otherwise, retrieve the user from the database
    user = await db.userStore.getUserById(decoded.userId);
  }

  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

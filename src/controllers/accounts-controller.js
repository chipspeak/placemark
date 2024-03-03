import dotenv from "dotenv";
import { db } from "../models/db.js";
// eslint-disable-next-line import/no-duplicates
import { UserSpec, UserUpdateSpec } from "../models/joi-schemas.js";
// eslint-disable-next-line import/no-duplicates
import { UserCredsSpec } from "../models/joi-schemas.js";

dotenv.config();

// export accountsController object
export const accountsController = {
  // shows index page
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },

  // shows signup page
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Placemark" });
    },
  },

  // function to sign up a new user, payload is checked against UserSpec schema
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },

  // shows login page
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Placemark" });
    },
  },

  // function to log in a user, payload is checked against UserCredsSpec schema
  login: {
    auth: false,
    validate: {
      payload: UserCredsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;

      // If the email and password match the admin credentials (stored in .env), we redirect to the admin view
      if (email === process.env.email && password === process.env.password) {
        request.cookieAuth.set({ id: "admin" });
        console.log(`logging in: ${process.env.email}`);
        return h.redirect("/admin");
      }
      // if they don't match admin, we continue
      const user = await db.userStore.getUserByEmail(email);
      // if the details don't match creds stored in the db, we refresh the page
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      // if the details match, we set the cookie and redirect to the dashboard
      request.cookieAuth.set({ id: user._id });
      console.log(`logging in: ${user.email}`);
      return h.redirect("/dashboard");
    },
  },

  // function to log out a user via clearing the cookie
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  // function to update a user via the updateUser function in the userStore
  updateUser: {
    auth: false,
    validate: {
      payload: UserUpdateSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("profile-view", { title: "Update error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const updatedUser = request.payload;
      const userId = request.params.id; // extract user ID from request parameters
      await db.userStore.updateUser(userId, updatedUser); // pass userId to updateUser function
      return h.redirect("/");
    },
  },

  // function to validate a user's session
  async validate(request, session) {
    // if the session ID corresponds to an admin user the admin user is valid
    if (session.id === "admin") {
      return { isValid: true, credentials: { id: "admin" } };
    }
    // for regular users, validate the session as before
    const user = await db.userStore.getUserById(session.id);
    // if the user is not found, the user is not valid
    if (!user) {
      return { isValid: false };
    }
    // if the user is found, the user is valid
    return { isValid: true, credentials: user };
  },
};

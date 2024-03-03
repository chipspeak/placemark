import Mongoose from "mongoose";
import Boom from "@hapi/boom";

const { Schema } = Mongoose;

// define the user schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

userSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = this.password === candidatePassword;
  if (!isMatch) {
    throw Boom.unauthorized("Password mismatch");
  }
  return this;
};

export const User = Mongoose.model("User", userSchema);

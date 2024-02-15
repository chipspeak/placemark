import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkSpec = {
  title: Joi.string().required(),
  description: Joi.string().max(200).required(),
  location: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  category: Joi.string().required(),
};
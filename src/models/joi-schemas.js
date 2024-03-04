import Joi from "joi";

// joi schemas for the user objects as per labs
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("User Credentials");

export const UserSpec = UserCredsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("User");

export const UserUpdateSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpsons.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("User Update");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("Full User Details");

export const UserArray = Joi.array().items(UserSpecPlus).label("User Array");

// array of allowed placemarks for user in the placemarks schema
const allowedCategories = ["Park", "Castle", "Ancient Ruin", "Walk", "Beach", "River", "Lake", "Waterfall", "Hike", "Cave", "Ringfort", "Dolmen", "Monument", "National Park"];

// spread operator is used to spread the allowedCategories array into the valid() function ensuring user has to use one of the allowed categories
export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().example("Phoenix Park").required(),
    description: Joi.string().example("Beautiful park with numerous attractions and plenty of parking").max(200).required(),
    location: Joi.string().example("Dublin, Ireland").required(),
    latitude: Joi.number().example("53.360001").min(-90).max(90).required(),
    longitude: Joi.number().example("-6.325000").min(-180).max(180).required(),
    category: Joi.string()
      .example("Park")
      .valid(...allowedCategories)
      .required(),
    img: Joi.string().example("phoenix-park.jpg")
  })
  .label("Placemark Details");

export const PlacemarkPlusSpec = PlacemarkSpec.keys({
  userId: IdSpec,
  _id: IdSpec,
  __v: Joi.number(),
}).label("Expanded Placemark Details");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkPlusSpec).label("Placemark Array");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("Jwt Authentification");

import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserUpdateSpec = Joi.object()
.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  email: Joi.string().email().example("homer@simpsons.com").required(),  
  password: Joi.string().example("secret").required(),
})
.label("UserUpdate");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
.keys({
  title: Joi.string().required(),
  description: Joi.string().max(200).required(),
  location: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  category: Joi.string().required(),
})
.label("PlacemarkDetails");

export const PlacemarkPlusSpec = PlacemarkSpec.keys({
  userId: IdSpec,
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkDetailsPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkPlusSpec).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

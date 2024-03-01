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


const allowedCategories = [
  "Park",
  "Castle",
  "Ancient Ruin",
  "Walk",
  "Beach",
  "River",
  "Lake",
  "Waterfall",
  "Hike",
  "Cave",
  "Ringfort",
  "Dolmen",
  "Monument",
  "National Park"
];


// spread operator is used to spread the allowedCategories array into the valid() function
export const PlacemarkSpec = Joi.object()
.keys({
  title: Joi.string().example("Phoenix Park").required(),
  description: Joi.string().example("Beautiful park with numerous attractions and plenty of parking").max(200).required(),
  location: Joi.string().example("Dublin, Ireland").required(),
  latitude: Joi.number().example("53.360001").min(-90).max(90).required(),
  longitude: Joi.number().example("-6.325000").min(-180).max(180).required(),
  category: Joi.string().example("Park").valid(...allowedCategories).required(),
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

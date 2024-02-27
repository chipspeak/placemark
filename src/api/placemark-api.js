import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { db } from "../models/db.js";
import { PlacemarkSpec, PlacemarkPlusSpec, IdSpec, PlacemarkArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { decodeToken, validate } from "./jwt-utils.js";


export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const foundPlacemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!foundPlacemark) {
          return Boom.notFound("No placemark with this id");
        }
        return foundPlacemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a placemark",
    notes: "Returns a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkPlusSpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        // Decode and validate the JWT token
        console.log(request.headers.authorization);
        const decodedToken = decodeToken(request.headers.authorization);
        const validationResult = await validate(decodedToken, request);
        console.log("Below is the validation result");
        console.log(validationResult);
        if (!validationResult.isValid) {
          return Boom.unauthorized("Invalid credentials");
        }
        // Access user ID from decoded payload
        // eslint-disable-next-line prefer-destructuring
        const userId = decodedToken.userId;
        // Access new placemark data from request payload
        const newPlacemark = request.payload;
        console.log("Below is the new placemark");
        console.log(newPlacemark);
        // Add userId to the new placemark data
        newPlacemark.userId = userId;
        // Proceed with placemark creation using the retrieved user ID
        const result = await db.placemarkStore.addPlacemark(userId, newPlacemark);
        if (result) {
          const resultObject = result.toObject();
          return h.response(resultObject).code(201);
        }
        return Boom.badImplementation("Error creating placemark");
      } catch (error) {
        console.error(error);
        return Boom.serverUnavailable("Database Error - check that a valid user id was provided");
      }
    },
    tags: ["api"],
    description: "Create a Placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkPlusSpec, failAction: validationError },
  },
  
  

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        await db.placemarkStore.deletePlacemark(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};

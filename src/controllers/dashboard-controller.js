import { db } from "../models/db.js";
// eslint-disable-next-line import/no-duplicates
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getPlacemarksByUserId(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        return h.view("dashboard-view", { title: "Add playlist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        title: request.payload.title,
        description: request.payload.description,
        location: request.payload.location,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        category: request.payload.category,
      };
      await db.placemarkStore.addPlacemark(loggedInUser._id, newPlacemark);
      return h.redirect("/dashboard");
    },
  },

  updatePlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const placemarkId = request.params.id;
        const oldPlacemark = await db.placemarkStore.getPlacemarkById(placemarkId);
        return h.view("partials/update-placemark", {
          title: "Update Placemark",
          placemark: oldPlacemark,
          errors: error.details
        }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const oldPlacemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const updatedPlacemark = {
        title: request.payload.title,
        description: request.payload.description,
        location: request.payload.location,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        category: request.payload.category,
      };
      await db.placemarkStore.updatePlacemark(oldPlacemark._id, updatedPlacemark);
      return h.redirect("/dashboard");
    },
  },

  showUpdatePlacemarkForm: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      return h.view("partials/update-placemark", { placemark });
    },
  },

  showProfile: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("profile-view", { user: loggedInUser });
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;
      await db.placemarkStore.deletePlacemark(placemarkId);
      return h.redirect("/dashboard");
    },
  },  
};
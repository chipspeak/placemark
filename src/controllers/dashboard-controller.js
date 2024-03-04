import { db } from "../models/db.js";
// eslint-disable-next-line import/no-duplicates
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

// export dashboardController object
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
      console.log("showing dashboard view...")
      return h.view("dashboard-view", viewData);
    },
  },

  // function to add a placemark, payload is checked against PlacemarkSpec schema
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
      console.log("adding new placemark: ", newPlacemark);
      await db.placemarkStore.addPlacemark(loggedInUser._id, newPlacemark);
      return h.redirect("/dashboard");
    },
  },

  // function to update a placemark, payload is checked against PlacemarkSpec schema
  updatePlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const placemarkId = request.params.id;
        const oldPlacemark = await db.placemarkStore.getPlacemarkById(placemarkId);
        return h
          .view("partials/update-placemark", {
            title: "Update Placemark",
            placemark: oldPlacemark,
            errors: error.details,
          })
          .takeover()
          .code(400);
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
      console.log("updating placemark with id: ", oldPlacemark._id);
      await db.placemarkStore.updatePlacemark(oldPlacemark._id, updatedPlacemark);
      return h.redirect("/dashboard");
    },
  },

  // function to upload an image
  uploadImage: {
    handler: async function (request, h) {
      try {
        // retrieve the placemark by id
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        // retrieve the image file from the payload
        const file = request.payload.imagefile;
        // if the file is not empty, upload the image and update the placemark with the image URL
        if (Object.keys(file).length > 0) {
          // retrieve the image URL from the imageStore
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          // update the placemark with the image URL parameter
          await db.placemarkStore.updatePlacemarkImage(placemark._id, url);
          console.log("image uploaded and placemark updated with image URL: ", url);
        }
        return h.redirect("/dashboard");
      } catch (err) {
        console.log(err);
        return h.redirect("/dashboard");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  // function to show the update placemark form via its partial
  showUpdatePlacemarkForm: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      console.log("showing update placemark form...")
      return h.view("partials/update-placemark", { placemark });
    },
  },

  // function to show the upload image form via its partial
  showUploadImageForm: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      console.log("showing upload image form...")
      return h.view("partials/placemark-image", { placemark });
    },
  },

  // function to show the profile view
  showProfile: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      console.log("showing profile view...")
      return h.view("profile-view", { user: loggedInUser });
    },
  },

  // function to delete a placemark and its associated image
  deletePlacemark: {
    handler: async function (request, h) {
      // retrieve the placemark by id
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      // checking if there is in fact an associated image before attempting to delete it
      if (placemark.img) {
        const imgURLParts = placemark.img.split("/");
        const publicId = imgURLParts[imgURLParts.length - 1].split(".")[0]; // removing the extension by turning the URL into an array delimited by the . and then removing the last element
        console.log("deleting image from database -> publicId: ", publicId)
        await imageStore.deleteImage(publicId);
      }
      await db.placemarkStore.deletePlacemark(placemarkId);
      return h.redirect("/dashboard");
    },
  },

  // function to delete an image
  deleteImage: {
    handler: async function (request, h) {
      // retrieve the placemark by id
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      // splitting the image URL to get the public ID (the last segment of the URL) delimited by the /
      const imgURLParts = placemark.img.split("/");
      // removing the extension by turning the URL into an array delimited by the . and then removing the last element
      const publicId = imgURLParts[imgURLParts.length - 1].split(".")[0];
      // passing the public ID to the deleteImage function in the imageStore
      console.log("deleting placemark image -> publicId: ", publicId)
      await imageStore.deleteImage(publicId);
      // setting the image URL to null and updating the placemark via the updatePlacemarkImage function in the placemarkStore
      placemark.img = null;
      await db.placemarkStore.updatePlacemarkImage(placemark._id, null);
      return h.redirect("/dashboard");
    },
  },
};

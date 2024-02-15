import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(userId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.userId = userId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByUserId(id) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userId === id);
  },

  async getPlacemarkById(id) {
    await db.read();
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
    placemark.title = updatedPlacemark.title;
    placemark.description = updatedPlacemark.description;
    placemark.location = updatedPlacemark.location;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
    placemark.category = updatedPlacemark.category;
    await db.write();
  },
};
import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryId = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    return placemarks.filter((placemark) => placemark.categoryId === id);
  },

  async getPlacemarkById(id) {
    let foundPlacemark = placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return  foundPlacemark;
  },

  async getCategoryPlacemarks(categoryId) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.categoryId === categoryId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  /*
  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
  },
  */
};
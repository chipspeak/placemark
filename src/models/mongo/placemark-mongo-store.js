import { Placemark } from "./placemark.js";
import { User } from "./user.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(userId, placemark) {
    placemark.userId = userId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return placemarkObj;
  },
  
  async getPlacemarksByUserId(userId) {
    const placemarks = await Placemark.find({ userId }).lean();
    return placemarks;
  },
  
  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemarkId, updatedPlacemark) {
    const retrievedPlacemark = await Placemark.findOne({ _id: placemarkId });
    retrievedPlacemark.title = updatedPlacemark.title;
    retrievedPlacemark.description = updatedPlacemark.description;
    retrievedPlacemark.location = updatedPlacemark.location;
    retrievedPlacemark.latitude = updatedPlacemark.latitude;
    retrievedPlacemark.longitude = updatedPlacemark.longitude;
    retrievedPlacemark.category = updatedPlacemark.category;
    const updatedPlacemarkObject = await retrievedPlacemark.save();
    return updatedPlacemarkObject;
  },
};
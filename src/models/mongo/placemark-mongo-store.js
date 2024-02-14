import { Placemark } from "./placemark.js";
import { Category } from "./category.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark.categoryId = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryId: id }).lean();
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

  async updatePlacemark(placemark, updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
    placemarkDoc.title = updatedPlacemark.title;
    placemarkDoc.description = updatedPlacemark.description;
    placemarkDoc.location = updatedPlacemark.location;
    await placemarkDoc.save();
  },
};
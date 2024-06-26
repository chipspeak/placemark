import { Placemark } from "./placemark.js";
import { User } from "./user.js";

// export placemarkMongoStore object
export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  // function to add a placemark
  async addPlacemark(userId, placemark) {
    placemark.userId = userId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return placemarkObj;
  },

  // function to get placemark by id
  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  // function to get placemarks by user id
  async getPlacemarksByUserId(userId) {
    const placemarks = await Placemark.find({ userId }).lean();
    return placemarks;
  },

  // function to get placemarks by user id and category
  async getPlacemarksByUserIdAndCategory(userId, category) {
    const query = { userId };
    if (category) {
      query.category = category;
    }
    const placemarks = await Placemark.find(query).lean();
    return placemarks;
  },

  // function to delete a placemark by id
  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // function to delete all placemarks
  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  // function to update a placemark image
  async updatePlacemarkImage(placemarkId, imageUrl) {
    // find the placemark by ID
    const placemark = await Placemark.findById(placemarkId);
    // check if the placemark exists
    if (!placemark) {
      throw new Error("Placemark not found");
    }
    // update the img field with the new image URL

    placemark.img.push(imageUrl);

    placemark.img = imageUrl;

    // save the updated placemark
    const updatedPlacemark = await placemark.save();
    return updatedPlacemark;
  },

  // function to update a placemark
  async updatePlacemark(placemarkId, updatedPlacemark) {
    const retrievedPlacemark = await Placemark.findOne({ _id: placemarkId });
    retrievedPlacemark.title = updatedPlacemark.title;
    retrievedPlacemark.description = updatedPlacemark.description;
    retrievedPlacemark.location = updatedPlacemark.location;
    retrievedPlacemark.latitude = updatedPlacemark.latitude;
    retrievedPlacemark.longitude = updatedPlacemark.longitude;
    retrievedPlacemark.category = updatedPlacemark.category;
    retrievedPlacemark.img = updatedPlacemark.img;
    const updatedPlacemarkObject = await retrievedPlacemark.save();
    return updatedPlacemarkObject;
  },
};

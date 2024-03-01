import { User } from "./user.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    // retrieving the user's placemarks
    const userPlacemarks = await placemarkMongoStore.getPlacemarksByUserId(id);

    // creating an array of promises to delete each placemark from the userPlaceMarks array
    await Promise.all(userPlacemarks.map(async (placemark) => {
        await placemarkMongoStore.deletePlacemark(placemark._id);
    }));

    // deleting the user
    await User.deleteOne({ _id: id });
  },

  async getNumberOfPlacemarks(id) {
    const user = await this.getUserById(id);
    return user.placemarks.length;
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(userId, updatedUser) {
    const currentUser = await User.findOne({ _id: userId });
    currentUser.firstName = updatedUser.firstName;
    currentUser.lastName = updatedUser.lastName;
    currentUser.email = updatedUser.email;
    currentUser.password = updatedUser.password;
    const updatedUserObject = await currentUser.save();
    return updatedUserObject;
  },
};
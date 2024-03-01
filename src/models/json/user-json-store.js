/* eslint-disable arrow-body-style */
import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async updateUser(userId, updatedUser) {
    await db.read();
    // eslint-disable-next-line no-shadow
    const user = db.data.users.find((user) => user._id === userId);
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    await db.write();
  },
  
  async deleteUserById(id) {
    await db.read();

    const userIndex = db.data.users.findIndex(user => user._id === id);

    if (userIndex !== -1) {
        const userPlacemarks = await placemarkJsonStore.getPlacemarksByUserId(id);

        // delete each placemark associated with the user
        await Promise.all(userPlacemarks.map(async placemark => {
            await placemarkJsonStore.deletePlacemark(placemark._id); // assuming deletePlacemark is a function in the same file
        }));

        db.data.users.splice(userIndex, 1);
        await db.write();
    }
},

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
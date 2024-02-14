import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const categoryJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },

  async addCategory(category) {
    await db.read();
    category._id = v4();
    category.placemarks = [];
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    let c = db.data.categories.find((category) => category._id === id);
    if (c === undefined) {
      c = null;
      return c;
    }
    c.placemarks = await placemarkJsonStore.getPlacemarkByCategoryId(c._id);
    if (c.placemarks === undefined) {
      c.placemarks = null;
    }
    return c;
  },

  async getUserCategories(userid) {
    await db.read();
    return db.data.categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((category) => category._id === id);
    if (index !== -1) db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },
};
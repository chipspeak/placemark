import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  categoryStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.placemarkStore = placemarkMemStore;
    }
  }
};
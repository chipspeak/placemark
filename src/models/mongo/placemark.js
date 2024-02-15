import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  description: String,
  location: String,
  latitude: String,
  longitude: String,
  category: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

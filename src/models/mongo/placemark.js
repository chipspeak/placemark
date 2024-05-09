import Mongoose from "mongoose";

const { Schema } = Mongoose;

// define the placemark schema
const placemarkSchema = new Schema({
  title: String,
  description: String,
  location: String,
  latitude: String,
  longitude: String,
  category: String,
      img: {
        type: [String],
        default: [],
    },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

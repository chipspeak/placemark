import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  artist: String,
  duration: Number,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

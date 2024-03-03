// import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({ 
  cloud_name: process.env.cloudinary_name, 
  api_key: process.env.cloudinary_key, 
  api_secret: process.env.cloudinary_secret 
});

// export the imageStore object
export const imageStore = {

  // function to get all images
  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  // function to upload an image
  uploadImage: async function(imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  // function to delete an image
  deleteImage: async function(img) {
    await cloudinary.v2.uploader.destroy(img, {});
  }
};
import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

class Cloudinary {
  get uploader() {
    return cloudinary.uploader;
  }
  get api() {
    return cloudinary.api;
  }
}

const cloudinaryService = new Cloudinary();

export default cloudinaryService;

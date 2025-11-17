// import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    // add to .env
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// import fs from "fs";
import cloudinary from "cloudinary";

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // remove local file after upload
    fs.unlinkSync(localFilePath);

    return result.secure_url;
  } catch (error) {
    // In case upload fails, still delete local file
    fs.unlinkSync(localFilePath);
    return null;
  }
};

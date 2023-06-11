require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const path = require("path");

const uploadImage = async (file) => {
  const image = await cloudinary.uploader.upload(file, (result) => result);

  return image;
};

module.exports = {
  uploadImage,
};

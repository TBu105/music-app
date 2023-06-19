require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const fs = require("fs");

const path = require("path");

const uploadFileToCloudinary = async (file) => {
  const fileUpload = await cloudinary.uploader.upload(
    file,
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        throw Error("Error to upload song: ", error);
      }
      return result;
    }
  );
  return fileUpload;
};

const uploadImage = async (req, res) => {
  if (!req.files) throw Error("No file uploaded");

  const { image } = req.files;

  const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

  const imageSize = 1024 * 1024;

  if (!fileTypes.includes(image.mimetype))
    throw Error("Image formats supported: JPG, PNG, JPEG");

  if (image.size / 1024 > imageSize)
    throw Error(`Image size should be less than ${imageSize}kb`);

  //upload ảnh lên cloudinary, nhận về một object gồm các thông tin liên quan đến ảnh đó
  const cloudFile = await uploadFileToCloudinary(image.tempFilePath);

  console.log(cloudFile);

  //ta muốn xóa những file ảnh được đăng lên khỏi server
  //có hai bước
  //bước 1: lấy đường dẫn của file ảnh
  const filePath = path.join("tmp", cloudFile.original_filename);

  //bước 2: xóa file ảnh
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });

  res
    .status(201)
    .json({ message: "Image uploaded successfully", imageURL: cloudFile.url });
};

const uploadSong = async (req, res) => {
  if (!req.files) throw Error("No file uploaded");

  const { song } = req.files;
  const fileTypes = ["audio/mpeg"];

  if (!fileTypes.includes(image.mimetype))
    throw Error("Image formats supported: MPEG");

  //upload ảnh lên cloudinary, nhận về một object gồm các thông tin liên quan đến ảnh đó
  const cloudFile = await uploadFileToCloudinary(song.tempFilePath);

  // console.log(cloudFile);

  //ta muốn xóa những file nhạc được đăng lên khỏi server
  //có hai bước
  //bước 1: lấy đường dẫn của file nhạc
  const filePath = path.join("tmp", cloudFile.original_filename);

  //bước 2: xóa file nhạc
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });

  res
    .status(201)
    .json({ message: "Song uploaded successfully", songURL: cloudFile.url });
};

module.exports = {
  uploadImage,
  uploadSong,
};

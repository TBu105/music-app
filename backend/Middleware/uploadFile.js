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
        return res.status(500).json({ error });
      }
      return result;
    }
  );
  return fileUpload;
};
const deleteFileInTMPFolder = (cloudFile) => {
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
};
const uploadFile = async (req, res, next) => {
  if (!req.files) return res.status(500).json({ error: "No file uploaded" });

  const { file } = req.files;

  // console.log(file);

  //upload ản lên cloudinary, nhận về một object gồm các thông tin liên quan đến ảnh đó
  const cloudFile = await uploadFileToCloudinary(file.tempFilePath);

  // console.log(cloudFile);
  req.cloudFile = cloudFile;

  deleteFileInTMPFolder(cloudFile);

  next();
};
const conditionallyUploadFile = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  if (
    req.files.file.mimetype === "image/jpeg" ||
    req.files.file.mimetype === "image/png"
  ) {
    uploadFile(req, res, next);
  } else {
    return res.status(500).json({ message: "File upload need to be image" });
  }
};

module.exports = {
  uploadFile,
  conditionallyUploadFile,
};

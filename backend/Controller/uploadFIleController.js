require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://music-app-peace.appspot.com/",
  });
}

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
const uploadTextToCloudinary = async (file) => {
  const fileUpload = await cloudinary.uploader.upload(
    file,
    { resource_type: "raw" },
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
const uploadFile = async (req, res) => {
  if (!req.files) return res.status(500).json({ error: "No file uploaded" });

  const { file } = req.files;

  console.log(file);

  //upload ảnh lên cloudinary, nhận về một object gồm các thông tin liên quan đến ảnh đó
  const cloudFile = await uploadFileToCloudinary(file.tempFilePath);

  // if (cloudFile.hasOwnProperty("duration")) {
  //   getCloudFile(cloudFile);
  // }

  console.log(cloudFile);

  deleteFileInTMPFolder(cloudFile);

  res
    .status(201)
    .json({ message: "File uploaded successfully", fileURL: cloudFile.url });
};

const uploadTextToFireBase = async (req, res) => {
  if (!req.files) throw Error("No file uploaded");

  const { text } = req.files;

  // Upload the text file to Firebase Storage
  const bucket = admin.storage().bucket();
  const fileUploadResult = await bucket.upload(text.tempFilePath, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Failed to upload the file.");
    }
  });

  console.log(fileUploadResult);

  // Get the public URL of the uploaded file
  const publicUrl = fileUploadResult[0].metadata.mediaLink;

  res
    .status(201)
    .json({ message: "File uploaded successfully", fileURL: publicUrl });
};

module.exports = {
  uploadFile,
  uploadTextToFireBase,
};

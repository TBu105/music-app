const User = require("../Model/User");

const { uploadImage } = require("./uploadFIleController");

// nhung function can thiet trong user controller la gi
const getUserById = (req, res) => {
  res.send("get user by id");
};

const getAllUsers = (req, res) => {
  res.send("get all users");
};

const updateUserById = (req, res) => {
  res.send("update user by id");
};

const updateUserPasswordById = (req, res) => {
  res.send("update user by id");
};

const deleteUserById = (req, res) => {
  res.send("delete user by id");
};

const uploadUserAvartar = async (req, res) => {
  if (!req.files) throw Error("No file uploaded");

  const { image } = req.files;
  const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const imageSize = 1024 * 1024;

  if (!fileTypes.includes(image.mimetype))
    throw Error("Image formats supported: JPG, PNG, JPEG");

  if (image.size / 1024 > imageSize)
    throw Error(`Image size should be less than ${imageSize}kb`);

  const cloudFile = await uploadImage(image.tempFilePath);
  console.log(cloudFile);

  res
    .status(201)
    .json({ message: "Image uploaded successfully", imageURL: cloudFile.url });
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUserById,
  updateUserPasswordById,
  deleteUserById,
  uploadUserAvartar,
};
("");

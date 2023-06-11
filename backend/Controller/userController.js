const User = require("../Model/User");

const { uploadImage } = require("./uploadFIleController");

const { attachTokenToCookies } = require("../Utils/jwt");

// nhung function can thiet trong user controller la gi
const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw Error("There is no user");
  }

  res.status(200).json({ message: "Take user success", user });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({ message: "List all user", users: allUsers });
};

const showCurrentUser = async (req, res) => {
  res.status(201).json({ user: req.user });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;

  //kiem tra xem nguoi thay doi thong tin co phai nguoi dang dang nhap, hoac
  //admin hay khong, neu khong thi khong cho doi thong tin
  if (req.user.userId !== id) {
    if (req.user.role !== "admin") {
      throw Error("Do not have permisson to change the user info");
    }
  }

  //kiem tra trong yeu cau thay doi co role hay khong
  //neu co thi phai kiem tra nguoi thay doi thong tin co phai admin khong
  //neu khong, thi khong duoc thay doi thong tin
  if (req.body.hasOwnProperty("role")) {
    if (req.user.role !== "admin") {
      throw Error("Do not have permisson to change the user role");
    }
  }

  //tim kiem thong id user, va thay doi thong tin theo req.body
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");

  //chi khi nguoi dang nhap, va ho tu cap nhat thong tin cho chinh ho, thi moi thay doi token
  if (req.user.userId === id) {
    const tokenUser = { email: user.email, userId: user._id, role: user.role };
    attachTokenToCookies({ res, payload: tokenUser });
  }

  res.status(200).json({ message: "Update user successfully", user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw Error("Please fill all the field");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isOldPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isOldPasswordCorrect) {
    throw Error("Password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.status(201).json({ message: "Success update password" });
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
  updateUserPassword,
  deleteUserById,
  uploadUserAvartar,
  showCurrentUser,
};

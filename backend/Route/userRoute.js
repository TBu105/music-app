const express = require("express");
const router = express.Router();
const { conditionallyUploadFile } = require("../Middleware/uploadFile");

const {
  getUserById,
  getAllUsers,
  updateUserById,
  updateUserPassword,
  deleteUserById,
  showCurrentUser,
} = require("../Controller/userController");

const { authenticateUser } = require("../Middleware/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/currentUser").get(authenticateUser, showCurrentUser);

router.route("/password").patch(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(getUserById)
  .patch(authenticateUser, conditionallyUploadFile, updateUserById)
  .delete(authenticateUser, deleteUserById);

module.exports = router;

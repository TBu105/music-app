const express = require("express");
const router = express.Router();

const {
  getUserById,
  getAllUsers,
  updateUserById,
  updateUserPasswordById,
  deleteUserById,
  uploadUserAvartar,
} = require("../Controller/userController");

router.route("/").get(getAllUsers);

router.route("/upload").post(uploadUserAvartar);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

router.route("/password/:id").patch(updateUserPasswordById);

module.exports = router;

const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../Middleware/authentication");

const {
  uploadImage,
  uploadSong,
} = require("../Controller/uploadFileController");

router.route("/image").post(authenticateUser, uploadImage);
router.route("/video").post(authenticateUser, uploadSong);

module.exports = router;

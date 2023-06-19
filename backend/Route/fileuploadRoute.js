const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../Middleware/authentication");

const { uploadImage } = require("../Controller/uploadFileController");

router.route("/image").post(authenticateUser, uploadImage);

module.exports = router;

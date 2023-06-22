const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../Middleware/authentication");

const {
  uploadFile,
  uploadTextToFireBase,
} = require("../Controller/uploadFileController");

router.route("/file").post(authenticateUser, uploadFile);
router.route("/text").post(authenticateUser, uploadTextToFireBase);

module.exports = router;

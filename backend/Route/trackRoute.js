const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../Middleware/authentication");
const {
  uploadFile,
  conditionallyUploadFile,
} = require("../Middleware/uploadFile");

const {
  createTrack,
  getAllTrack,
  getTrackById,
  updateTrackById,
  deleteTrackById,
  getAllTracksOfAUser,
} = require("../Controller/trackController");

router.route("/").get(authenticateUser, getAllTrack);
router.route("/create").post(authenticateUser, uploadFile, createTrack);
router
  .route("/:id")
  .get(authenticateUser, getTrackById)
  .patch(authenticateUser, conditionallyUploadFile, updateTrackById)
  .delete(authenticateUser, deleteTrackById);
router.route("/alltrack/user/:id").get(authenticateUser, getAllTracksOfAUser);

module.exports = router;

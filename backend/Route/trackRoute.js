const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../Middleware/authentication");

const {
  createTrack,
  getAllTrack,
  getTrackById,
  updateTrackById,
  deleteTrackById,
} = require("../Controller/trackController");

router.route("/").get(authenticateUser, getAllTrack);
router.route("/create").post(authenticateUser, createTrack);
router
  .route("/:id")
  .get(getTrackById)
  .patch(authenticateUser, updateTrackById)
  .delete(authenticateUser, deleteTrackById);

module.exports = router;

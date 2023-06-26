const express = require("express");
const router = express.Router();

const {
  getAllHistoryByUserId,
  getOneHistoryByHistoryId,
  deleteOneHistoryByHistoryId,
  deleteAllHistoryByUserId,
} = require("../Controller/historyController");

const { authenticateUser } = require("../Middleware/authentication");

router
  .route("/:id")
  .get(authenticateUser, getOneHistoryByHistoryId)
  .delete(authenticateUser, deleteOneHistoryByHistoryId);
router
  .route("/user/:id")
  .get(authenticateUser, getAllHistoryByUserId)
  .delete(authenticateUser, deleteAllHistoryByUserId);

module.exports = router;

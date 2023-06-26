const express = require("express");
const router = express.Router();

const {
  getAllHistoryByUserId,
  getOneHistoryByUserIdAndHistoryId,
  deleteOneHistoryByUserIdAndHistoryId,
  deleteAllHistoryOfAUser,
} = require("../Controller/historyController");

const { authenticateUser } = require("../Middleware/authentication");

router
  .route("/:id1/user/:id2")
  .get(authenticateUser, getOneHistoryByUserIdAndHistoryId)
  .delete(authenticateUser, deleteOneHistoryByUserIdAndHistoryId);
router
  .route("/:id")
  .get(authenticateUser, getAllHistoryByUserId)
  .delete(authenticateUser, deleteAllHistoryOfAUser);

module.exports = router;

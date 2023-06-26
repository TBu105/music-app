const History = require("../Model/History");

const getAllHistoryByUserId = async (req, res) => {
  res.send("getAllHistoryOfAUser");
};
const getOneHistoryByUserIdAndHistoryId = async (req, res) => {
  res.send("getOneHistoryById");
};
const deleteOneHistoryByUserIdAndHistoryId = async (req, res) => {
  res.send("deleteOneHistoryById");
};
const deleteAllHistoryOfAUser = async (req, res) => {
  res.send("DeleteAllHistoryOfAUser");
};

module.exports = {
  getAllHistoryByUserId,
  getOneHistoryByUserIdAndHistoryId,
  deleteOneHistoryByUserIdAndHistoryId,
  deleteAllHistoryOfAUser,
};

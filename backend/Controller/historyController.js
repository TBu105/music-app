const History = require("../Model/History");

const getAllHistoryByUserId = async (req, res) => {
  const allHistory = await History.find({ userId: req.user.userId });

  res.status(200).json({
    message: "Get All History Of A User Successfully",
    count: allHistory.length,
    allHistory,
  });
};
const getOneHistoryByHistoryId = async (req, res) => {
  res.send("getOneHistoryById");
};
const deleteOneHistoryByHistoryId = async (req, res) => {
  res.send("deleteOneHistoryById");
};
const deleteAllHistoryByUserId = async (req, res) => {
  res.send("DeleteAllHistoryOfAUser");
};

module.exports = {
  getAllHistoryByUserId,
  getOneHistoryByHistoryId,
  deleteOneHistoryByHistoryId,
  deleteAllHistoryByUserId,
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachTokenToCookies = async ({ res, payload }) => {
  //create token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  //create expire day
  const oneDay = 1000 * 60 * 60 * 24;

  //attach token to cookie through res
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed: true,
  });
};

module.exports = {
  isTokenValid,
  attachTokenToCookies,
};

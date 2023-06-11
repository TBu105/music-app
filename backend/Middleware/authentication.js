const { isTokenValid } = require("../Utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw Error("Authentication Invalid");
  }

  const { email, userId, role } = await isTokenValid({ token });
  req.user = { email, userId, role };

  next();
};

module.exports = { authenticateUser };

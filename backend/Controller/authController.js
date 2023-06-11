const User = require("../Model/User");

const { attachTokenToCookies } = require("../Utils/jwt");

const register = async (req, res) => {
  const { email, username, birthday, password, gender, image } = req.body;

  if (!email || !username || !birthday || !gender || !password) {
    throw Error("You need to field all the information");
  }

  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    throw Error("User is already exist");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    email,
    username,
    birthday,
    gender,
    password,
    role,
    image,
  });

  //create payload
  const tokenUser = { email: user.email, userId: user._id, role: user.role };
  //create jwt token and attach it to cookie
  attachTokenToCookies({ res, payload: tokenUser });

  res.status(201).json({ message: "User is created", user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Error("You need to field all the information");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("User is not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw Error("Password is invalid");
  }

  const tokenUser = { email: user.email, userId: user._id, role: user.role };

  //create jwt token and attach it to cookie
  attachTokenToCookies({ res, payload: tokenUser });

  res.status(200).json({ message: "Success login", user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(200).json({ message: "Logout success" });
};

module.exports = {
  register,
  login,
  logout,
};

const User = require("../Model/User");
const Playlist = require("../Model/Playlist");

const { attachTokenToCookies } = require("../Utils/jwt");

const register = async (req, res) => {
  const { email, username, birthday, password, gender } = req.body;

  if (!email || !username || !birthday || !gender || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information" });
  }

  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    return res.status(500).json({ error: "User is already exist" });
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const user = await User.create({
    email,
    username,
    birthday,
    gender,
    password,
    role: isFirstAccount ? "admin" : "user",
  });

  // create Liked Music playlist when user is created
  const defaultLikedMusicPlaylist = await Playlist.create({
    userId: user._id,
    title: "Liked Music",
  });

  //set user liked music equal playlist id
  user.likedMusic = defaultLikedMusicPlaylist._id;

  user.save();

  //create payload
  const tokenUser = { email: user.email, userId: user._id, role: user.role };
  //create jwt token and attach it to cookie
  attachTokenToCookies({ res, payload: tokenUser });

  res.status(201).json({ message: "User is created", user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ error: "User is not exist" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(500).json({ error: "Password is invalid" });
  }

  const tokenUser = { email: user.email, userId: user._id, role: user.role };

  //create jwt token and attach it to cookie
  attachTokenToCookies({ res, payload: tokenUser });

  res.status(200).json({message: "Success login", user: tokenUser });
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

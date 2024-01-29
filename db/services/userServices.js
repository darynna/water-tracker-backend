const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../models/users");
const { httpError } = require("../../utilities");
const { SECRET_WORD } = process.env;

const createUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw httpError(409, "Email in use");

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const name = email.split("@")[0];
  const newUser = await User.create({
    ...body,
    password: hashPassword,
    name,
    avatarURL,
    gender: "woman",
    dailyNorma: 1.5,
  });
  return newUser;
};

const loginUser = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) throw httpError(401, "Email or password is wrong");

  const passwordCompared = await bcrypt.compare(password, user.password);
  if (!passwordCompared) throw httpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "24h" });
  const userUpdated = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  return userUpdated;
};

const logoutUser = async (user) => {
  const { _id } = user;
  await User.findByIdAndUpdate(_id, { token: "" });
};

const getUserInfo = async (req) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) throw httpError(404, "User not found" )
  return user;
};

const changeUserinformation = async (req, res) => {
  const { name, email, avatarURL, gender, dailyNorma, newPassword } = req.body;
  const user = await getUserInfo(req);

  if (!user) throw httpError(404, "User not found" )
  

  user.name = name || user.name;
  user.email = email || user.email;
  user.avatarURL = avatarURL || user.avatarURL;
  user.gender = gender || user.gender;
  user.dailyNorma = dailyNorma || user.dailyNorma;

  if (newPassword) {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
  }

  await user.save();
  return user;
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path; 
  if (!avatarURL) throw httpError(500, "Server problem")
  
  await User.findByIdAndUpdate(_id, { avatarURL });
  return avatarURL
};

const updateDailyNormaService = async (id, dailyNorma) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { dailyNorma },
    {
      new: true,
    }
  );
  return updatedUser;
};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUserInfo,
  changeUserinformation,
  updateAvatar,
  updateDailyNormaService,
};

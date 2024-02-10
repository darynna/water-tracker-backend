const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../models/users");
const {
  httpError,
  sendEmail,
  verifyEmailMessage,
  passwordResetMessage,
} = require("../../utilities");
const { nanoid } = require("nanoid");
const { SECRET_WORD } = process.env;

const createUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw httpError(409, "Email in use");

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const name = email.split("@")[0];
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...body,
    password: hashPassword,
    name,
    avatarURL,
    verificationToken,
  });

  await sendEmail(verifyEmailMessage(email, newUser));

  return newUser;
};

const verifyEmailService = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw httpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
};
const resendVerifyEmailService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(404, "User not found");
  }
  if (user.verify) {
    throw httpError(401, "Verification has already been passed");
  }

  await sendEmail(verifyEmailMessage(email, user));
};

const loginUser = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) throw httpError(401, "Email or password is wrong");

  const passwordCompared = await bcrypt.compare(password, user.password);
  if (!passwordCompared) throw httpError(401, "Email or password is wrong");

  if (!user.verify) throw httpError(401, "Your e-mail is not verified");

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
  await User.findByIdAndUpdate(_id, { token: null });
};

const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw httpError(401, "Email or password is wrong");

  await sendEmail(passwordResetMessage(email));
};

const changePasswordService = async (newPassword, email) => {
  const user = await User.findOne({ email });
  if (!user) throw httpError(401, "Email or password is wrong");

  const hashPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashPassword;
  await user.save();
};

const getUserInfo = async (req) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) throw httpError(404, "User not found");
  return user;
};

const changeUserinfo = async (req, res) => {
  const {
    name,
    email,
    avatarURL,
    gender,
    dailyNorma,
    currentPassword,
    newPassword,
  } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) throw httpError(404, "User not found");

  if (currentPassword && newPassword) {
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw httpError(401, "Invalid current password");
    }
    if (newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashPassword;
    }
  } else if (currentPassword || newPassword) {
    // If either currentPassword or newPassword is provided without the other, throw an error
    throw httpError(400, "Both currentPassword and newPassword are required");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.avatarURL = avatarURL || user.avatarURL;
  user.gender = gender || user.gender;
  user.dailyNorma = dailyNorma || user.dailyNorma;

  await user.save();
  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    token: user.token,
    avatarURL: user.avatarURL,
    name: user.name,
    gender: user.gender,
    dailyNorma: user.dailyNorma,
  };
  return sanitizedUser;
};

const updatedAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  if (!avatarURL) throw httpError(500, "Server problem");

  await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );
  return avatarURL;
};

const updateDailyNormaService = async (_id, dailyNorma) => {
  const updatedUser = await User.findByIdAndUpdate(
    _id,
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
  changeUserinfo,
  updatedAvatar,
  updateDailyNormaService,
  verifyEmailService,
  resendVerifyEmailService,
  forgotPasswordService,
  changePasswordService,
};

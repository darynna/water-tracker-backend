const {
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
} = require("../db/services/userServices");
const { catchAsync } = require("../utilities");

const { FRONT_END } = process.env;

// Authentication
const signup = async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  await verifyEmailService(verificationToken);
  res.redirect(`${FRONT_END}/signin`);
};
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  await resendVerifyEmailService(email);
  res.status(200).json({ message: "Verification email sent" });
};
const login = async (req, res) => {
  const { id, email, token, avatarURL, name, gender, dailyNorma } =
    await loginUser(req.body);
  res.json({
    token,
    user: { id, email, avatarURL, name, gender, dailyNorma },
  });
};

const logout = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  await forgotPasswordService(email);
  res.status(200).json({
    message: "Email sent successfully",
    userEmail: email,
  });
};

const changePassword = async (req, res) => {
  const { password, email } = req.body;
  await changePasswordService(password, email);
  res.redirect(`${FRONT_END}/signin`);
};

// User
const getUserInformation = async (req, res) => {
  const userInfo = await getUserInfo(req);
  res.status(200).json(userInfo);
};

const changeUserinformation = async (req, res) => {
  const updatedUser = await changeUserinfo(req, res);
  res.status(200).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const avatarURL = await updatedAvatar(req, res);
  res.status(200).json({ avatarURL });
};

const updateDailyNorma = async (req, res) => {
  const { _id } = req.user;
  const { dailyNorma } = req.body;

  const updatedUser = await updateDailyNormaService(_id, dailyNorma);

  res.status(200).json({ dailyNorma: updatedUser.dailyNorma });
};

module.exports = {
  signup: catchAsync(signup),
  login: catchAsync(login),
  logout: catchAsync(logout),
  getUserInformation: catchAsync(getUserInformation),
  changeUserinformation: catchAsync(changeUserinformation),
  updateAvatar: catchAsync(updateAvatar),
  updateDailyNorma: catchAsync(updateDailyNorma),
  verifyEmail: catchAsync(verifyEmail),
  resendVerifyEmail: catchAsync(resendVerifyEmail),
  forgotPassword: catchAsync(forgotPassword),
  changePassword: catchAsync(changePassword),
};

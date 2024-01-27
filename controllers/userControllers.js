const {
  createUser,
  loginUser,
  logoutUser,
  getUserInfo,
  changeUserinformation,
  updateAvatar,
  updateDailyNormaService,
} = require("../db/services/userServices");
const { catchAsync } = require("../utilities");

// Authentication
exports.signup = catchAsync(async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const userUpdated = await loginUser(req.body);
  res.json({
    token: userUpdated.token,
    user: {
      email: userUpdated.email,
      subscription: userUpdated.subscription,
    },
  });
});

exports.logout = catchAsync(async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
});

// User
exports.getUserInfo = catchAsync(async (req, res) => {
  const userInfo = await getUserInfo(req);
  res.status(200).json(userInfo);
});

exports.changeUserinformation = catchAsync(async (req, res) => {
  const updatedUser = await changeUserinformation(req, res);
  res.status(200).json(updatedUser);
});

exports.updateAvatar = catchAsync(async (req, res) => {
  const avatarURL = await updateAvatar;
  res.status(200).json({ avatarURL });
});

exports.updateDailyNorma = catchAsync(async (req, res) => {
  const { _id } = req.user;
  // const { dailyNorma } = req.body;

  // Розрахунок денної норми води
  const { gender, weight, hours } = req.body;

  const dailyNorma =
    gender === "woman"
      ? weight * 0.03 + hours * 0.4
      : weight * 0.04 + hours * 0.6;

  if (dailyNorma > 15) {
    res.status(400).json({ message: "dailyNorma cannot exceed 15" });
  }

  const updatedUser = await updateDailyNormaService(_id, dailyNorma);

  res.status(200).json(updatedUser);
});

const {
  createUser,
  loginUser,
  logoutUser,
  getUserInfo,
  changeUserinfo,
  updatedAvatar,
  updateDailyNormaService,
} = require("../db/services/userServices");
const { catchAsync } = require("../utilities");

// Authentication
const signup = catchAsync(async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const userUpdated = await loginUser(req.body);
  res.json({
    token: userUpdated.token,
    user: {
      email: userUpdated.email,
    },
  });
});

const logout = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
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

  res.status(200).json(updatedUser);
};

module.exports = {
  signup: catchAsync(signup),
  login: catchAsync(login),
  logout: catchAsync(logout),
  getUserInformation: catchAsync(getUserInformation),
  changeUserinformation: catchAsync(changeUserinformation),
  updateAvatar: catchAsync(updateAvatar),
  updateDailyNorma: catchAsync(updateDailyNorma),
};

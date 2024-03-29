const {
  signup,
  login,
  getCurrent,
  logout,
  getUserInformation,
  changeUserinformation,
  updateAvatar,
  updateDailyNorma,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  changePassword,
} = require("./userControllers");

const {
  addWater,
  updateWater,
  deleteById,
  getSummary,
  getSummaryMonth,
} = require("./waterControllers");
const { googleAuth, googleRedirect } = require("./googleAuthControllers");
module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  getUserInformation,
  changeUserinformation,
  updateAvatar,

  addWater,
  updateWater,
  deleteById,
  updateDailyNorma,
  getSummary,
  getSummaryMonth,

  googleAuth,
  googleRedirect,

  verifyEmail,
  resendVerifyEmail,

  forgotPassword,
  changePassword,
};

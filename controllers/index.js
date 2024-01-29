const {
  signup,
  login,
  getCurrent,
  logout,
  getUserInfo,
  changeUserinformation,
  updateAvatar,
  updateDailyNorma,
} = require("./userControllers");

const { addWater, updateWater, deleteById, getSummary } = require("./waterControllers");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  getUserInfo,
  changeUserinformation,
  updateAvatar,

  addWater,
  updateWater,
  deleteById,
  updateDailyNorma,
  getSummary
};

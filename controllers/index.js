const {
    signup,
    login,
    getCurrent,
    logout,
    getUserInfo,
    changeUserinformation,
    updateAvatar
} = require('./userControllers')   

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  getUserInfo,
  changeUserinformation,
  updateAvatar
  }
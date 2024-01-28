const express = require("express");
const {
  signup,
  login,
  logout,
  getUserInfo,
  changeUserinformation,
  updateAvatar,
  updateDailyNorma,
} = require("../../controllers");

const { authValidation } = require("../../utilities");
const {
  validateBody,
  authantication,
  upload, 
  uploadAvatar
} = require("../../middleware");
const { dailyNormaValidation } = require("../../utilities/validation");

const router = express.Router();

router.post("/register", validateBody(authValidation), signup);
router.post("/login", validateBody(authValidation), login);
router.post("/logout", authantication, logout);

router.get("/", authantication, getUserInfo);
router.patch("/update", authantication, changeUserinformation);
router.patch(
  "/avatar",
  authantication,
  upload.single("avatar"),
  uploadAvatar,
  updateAvatar
);

// *ендпоінт для оновлення кількості води (dailyNorma)
router.patch(
  "/dailyNorma",
  authantication,
  validateBody(dailyNormaValidation),
  updateDailyNorma
);

module.exports = router;

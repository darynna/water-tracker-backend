const express = require("express");
const {
  signup,
  login,
  logout,
  getUserInformation,
  changeUserinformation,
  updateAvatar,
  updateDailyNorma,
  googleAuth,
  googleRedirect,
} = require("../../controllers");

const {
  authValidation,
  changeUserInfoValidation,
  dailyNormaValidation,
} = require("../../utilities");
const { validateBody, authantication, upload } = require("../../middleware");

const router = express.Router();

router.post("/register", validateBody(authValidation), signup);
router.post("/login", validateBody(authValidation), login);
router.post("/logout", authantication, logout);

router.get("/", authantication, getUserInformation);

router.patch(
  "/update",
  authantication,
  validateBody(changeUserInfoValidation),
  changeUserinformation
);
router.patch("/avatar", authantication, upload.single("avatar"), updateAvatar);

router.patch(
  "/dailyNorma",
  authantication,
  validateBody(dailyNormaValidation),
  updateDailyNorma
);

router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);

module.exports = router;

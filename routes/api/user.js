const express = require('express')
const {
    signup,
    login,
    logout,
    getUserInfo,
    changeUserinformation,
    updateAvatar
} = require('../../controllers')

const {authValidation} = require('../../utilities')
const {validateBody, authantication, uploadUserPhoto} = require("../../middleware")

const router = express.Router();

router.post('/register',validateBody(authValidation), signup);
router.post('/login',validateBody(authValidation), login);
router.post("/logout", authantication, logout);

router.get("/", authantication, getUserInfo);
router.patch("/update", authantication, changeUserinformation);
router.patch("/avatar", authantication, uploadUserPhoto.single("avatarURL"), updateAvatar)
router.patch("/rate")

module.exports = router;

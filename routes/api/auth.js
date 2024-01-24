const express = require('express')
const {
    signup,
    login,
    getCurrent,
    logout,
    updateSubscription
} = require('../../controllers')

const {authValidation} = require('../../utilities')
const {validateBody, authantication} = require("../../middleware")

const router = express.Router();

router.post('/register',validateBody(authValidation), signup);
router.post('/login',validateBody(authValidation), login);
router.post("/logout", authantication, logout);
router.get("/current", authantication, getCurrent);
router.patch("/", authantication, updateSubscription)


module.exports = router;

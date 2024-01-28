const validateBody = require("./bodyValidation");
const isValidId = require('./idValidation');
const isEmptyReqBody = require('./emptyBodyValidation')
const authantication = require("./authantication")
const { upload, uploadAvatar } = require("./uploadAvatar")

module.exports =  {validateBody, isValidId, isEmptyReqBody, authantication, upload, uploadAvatar}
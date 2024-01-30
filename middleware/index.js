const validateBody = require("./bodyValidation");
const isValidId = require('./idValidation');
const isEmptyReqBody = require('./emptyBodyValidation')
const authantication = require("./authantication")
const upload = require("./uploadAvatar")
const validateQuery = require("./queryValidation")

module.exports =  {validateBody, isValidId, isEmptyReqBody, authantication, upload, validateQuery}
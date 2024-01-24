const validateBody = require("./bodyValidation");
const isValidId = require('./idValidation');
const isEmptyReqBody = require('./emptyBodyValidation')
const authantication = require("./authantication")

module.exports =  {validateBody, isValidId, isEmptyReqBody, authantication}
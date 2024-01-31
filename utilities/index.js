const catchAsync = require("./catchAsync");
const httpError = require("./httpError");
const {
  bodyValidation,
  updateFavoriteValidation,
  authValidation,
  todayDatevalidation,
  validateInput,
} = require("./validation");
const handleMongooseError = require("./handleMongooseError");
const { formatDate, formatDateForEndpoins } = require("./formatDate");

module.exports = {
  catchAsync,
  httpError,
  bodyValidation,
  updateFavoriteValidation,
  todayDatevalidation,
  authValidation,
  handleMongooseError,
  formatDate,
  formatDateForEndpoins,
  validateInput,
};

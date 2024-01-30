const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utilities");

const isValidId = (req, res, next) => {
  const { waterId } = req.params;
  if (!isValidObjectId(waterId)) {
    next(httpError(400, `${waterId} is not valid id`));
    return;
  }
  next();
};

module.exports = isValidId;

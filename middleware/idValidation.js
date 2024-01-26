const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utilities");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not valid id`));
    return;
  }
  next();
};

module.exports = isValidId;

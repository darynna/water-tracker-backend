const { httpError } = require('../utilities');

const isEmptyReqBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(httpError(400, "There are missing fields"));
  }
  next();
};

module.exports = isEmptyReqBody;
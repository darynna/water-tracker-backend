const {httpError} = require('../utilities');
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { SECRET_WORD } = process.env;


const authantication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }

    try {
    const { id } = jwt.verify(token, SECRET_WORD);

    const currentUser = await User.findById(id);

    if (!currentUser || !currentUser.token || currentUser.token !== token) {
      next(httpError(401, "Not authorized"));
    }

    req.user = currentUser;
    next();
  } catch {
    next(httpError(401, "Not authorized"));
  }
};

module.exports =  authantication;
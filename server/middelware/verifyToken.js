const jwt = require("jsonwebtoken");

const { NoTokenEror, InvalidToken } = require("../js/error/error");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) next(new InvalidToken());
      req.user = user;
      next();
    });
  } else {
    next(new NoTokenEror());
  }
};

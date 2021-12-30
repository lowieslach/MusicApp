const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) next(err);
      req.user = user;
      next();
    });
  } else {
    let err = new Error("No Token");
    err.status = "fail";
    err.statusCode = 401;
    next(err);
  }
};

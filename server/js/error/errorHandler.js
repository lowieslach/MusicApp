const {
  DefaultError,
  ValidationError,
  DuplicateKeyError,
  ServerError,
} = require("./error");

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = new ValidationError(err);
  } else if (err.code && err.code == 11000) {
    err = new DuplicateKeyError(err);
  } else if (!(err instanceof DefaultError)) {
    console.log(err);
    err = new ServerError();
  }
  err.response(res);
};

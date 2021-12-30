module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ValidationError") {
    handleValidationError(err, res);
  } else if (err.code && err.code == 11000) {
    handleDuplicateKeyError(err, res);
  } else {
    if (err.status !== "fail") console.log(err);
    res.status(err.statusCode).json({
      succes: false,
      status: err.status,
      message: err.message,
    });
  }
  //https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b
};

const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);

  res.status(400).send({ succes: false, messages: errors, fields: fields });
};
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).send({ succes: false, messages: error, fields: field });
};

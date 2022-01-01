class DefaultError {
  constructor(type = "", statusCode = 500, data = {}) {
    this.type = type;
    this.statusCode = statusCode;
    this.data = data;
  }
  response(res) {
    res.status(this.statusCode).send({ type: this.type, data: this.data });
  }
}

class WrongCredentialsError extends DefaultError {
  constructor() {
    super("WRONGCREDENTIALS", 403, { message: "The credentials are wrong!" });
  }
}
class ValidationError extends DefaultError {
  constructor(err) {
    const messages = Object.values(err.errors).map((el) => el.message);
    const fields = Object.values(err.errors).map((el) => el.path);
    super("VALIDATION", 400, { messages, fields });
  }
}
class DuplicateKeyError extends DefaultError {
  constructor(err) {
    const field = Object.keys(err.keyValue);
    const message = `An account with that ${field} already exists.`;
    super("DUPLICATEKEY", 409, { message, field });
  }
}
class NoTokenEror extends DefaultError {
  constructor() {
    super("NOTOKEN", 401, { message: "No token" });
  }
}
class InvalidToken extends DefaultError {
  constructor() {
    super("INVALIDTOKEN", 401, { message: "Token is invalid" });
  }
}
class ServerError extends DefaultError {
  constructor() {
    super("SERVER", 500, { message: "Server error" });
  }
}

module.exports = {
  DefaultError,
  WrongCredentialsError,
  ValidationError,
  DuplicateKeyError,
  NoTokenEror,
  InvalidToken,
  ServerError,
};

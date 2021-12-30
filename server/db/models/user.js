const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { RANGS } = require("../../js/constants");

const UserSchema = new mongoose.Schema({
  rang: {
    type: String,
    default: RANGS.USER,
  },
  username: {
    type: String,
    required: [true, "Enter a username"],
    unique: [true, "That username is taken"],
  },
  email: {
    type: String,
    required: [true, "Enter a email"],
    unique: [true, "That email is taken"],
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Enter a password!"],
    minLength: [4, "Password should be at least four characters"],
  },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);

const router = require("express").Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../../db/models/user");
const { verifyToken } = require("../../middelware/verifyToken");
const { WrongCredentialsError } = require("../../js/error/error");

router.get("/checkToken", verifyToken, (req, res, next) => {
  res.status(200).json(req.user);
});

router.post("/login", (req, res, next) => {
  UserModel.findOne(
    { email: req.body.email },
    "password username rang",
    (err, user) => {
      if (err) next(err);
      if (!user) {
        next(new WrongCredentialsError());
        return;
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) next(err);
        if (isMatch) {
          const { password, ...other } = user._doc;
          const token = jwt.sign(
            {
              id: other._id,
              rang: other.rang,
              username: other.username,
            },
            process.env.JWT_SEC,
            { expiresIn: process.env.JWT_EXP }
          );
          res.status(200).json({
            token,
            user: other,
          });
        } else {
          next(new WrongCredentialsError());
        }
      });
    }
  );
});

module.exports = router;

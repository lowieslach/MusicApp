const router = require("express").Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../../db/models/user");

router.post("/login", (req, res, next) => {
  UserModel.findOne(
    { email: req.body.email },
    "password username rang",
    (err, user) => {
      if (err) next(err);
      if (!user) {
        let err = new Error("Wrong credentials");
        err.status = "fail";
        err.statusCode = 403;
        next(err);
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
            },
            process.env.JWT_SEC,
            { expiresIn: process.env.JWT_EXP }
          );
          res.status(200).json({
            succes: true,
            token,
            user: other,
          });
        } else {
          let err = new Error("Wrong credentials");
          err.status = "fail";
          err.statusCode = 403;
          next(err);
        }
      });
    }
  );
});
module.exports = router;

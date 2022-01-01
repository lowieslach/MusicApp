const router = require("express").Router();

const UserModel = require("../../db/models/user");

router.post("/register", (req, res, next) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json({});
  });
});

module.exports = router;

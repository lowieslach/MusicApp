const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middelware/verifyToken");

router.get("/", verifyToken, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;

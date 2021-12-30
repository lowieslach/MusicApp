const express = require("express");
const router = express.Router();

router.use("/add", require("./add"));
module.exports = router;

const express = require("express");
const router = express.Router();
router
  .post("/login", require("../loginUser.authController").service)
  .get("/refresh-token", require("../refreshUser.authController").service);
module.exports = router;

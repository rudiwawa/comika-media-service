const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const socialite = require("../socialite.authController");
const verification = require("../verification.authController");
router
  .post("/login", require("../loginUser.authController").service)
  .get("/refresh-token", require("../refreshUser.authController").service)
  .post("/login-socialite", socialite.validation, validator, socialite.service)
  .get("/verification/:token", verification.service);
module.exports = router;

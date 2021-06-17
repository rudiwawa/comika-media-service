const express = require("express");
const router = express.Router();
router
  .post(
    "/login",
    require("../controllers/auth/loginAdmin.authController").service
  )
  .post(
    "/login-user",
    require("../controllers/auth/loginUser.authController").service
  )
  .get(
    "/refresh-token",
    require("../controllers/auth/refreshAdmin.authController").service
  )
  .get(
    "/refresh-token-user",
    require("../controllers/auth/refreshUser.authController").service
  );

module.exports = router;

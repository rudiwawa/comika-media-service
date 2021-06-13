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
  );

module.exports = router;

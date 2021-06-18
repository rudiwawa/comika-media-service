const express = require("express");
const router = express.Router();

router
  .post("/login", require("./loginAdmin.authController").service)
  .get("/refresh-token", require("./refreshAdmin.authController").service);

module.exports = router;

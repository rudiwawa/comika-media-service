const express = require("express");
const router = express.Router();
router.get(
  "/",
  require("../controllers/auth/loginAdmin.userController").service
);

module.exports = router;

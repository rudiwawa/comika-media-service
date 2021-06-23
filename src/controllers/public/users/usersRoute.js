const express = require("express");
const router = express.Router();
const signupController = require("./signup.userController");
const myaccountController = require("./myaccount.userController");
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtUser");
router
  .post(
    "/signup",
    signupController.validation,
    validator,
    signupController.service
  )
  .get("/me", checkToken, myaccountController.service);

module.exports = router;

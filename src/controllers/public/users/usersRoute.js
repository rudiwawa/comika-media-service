const express = require("express");
const router = express.Router();
const signupController = require("./signup.userController");
const myaccountController = require("./myaccount.userController");
const ResetPasswordController = require("./resetPassword.userController");
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtUser");
router
  .get("/me", checkToken, myaccountController.service)
  .get("/reset-password/:email", ResetPasswordController.service)
  .post(
    "/signup",
    signupController.validation,
    validator,
    signupController.service
  )
  .post(
    "/reset-password",
    ResetPasswordController.validationReset,
    validator,
    ResetPasswordController.setResetPassword
  );

module.exports = router;

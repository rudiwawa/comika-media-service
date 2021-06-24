const express = require("express");
const router = express.Router();
const signupController = require("../signup.userController");
const myaccountController = require("../myAccount.userController");
const ResetPasswordController = require("../resetPassword.userController");
const updateUserController = require("../update.userController")
const changePasswordController = require("../changePassword.userController")

const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtUser");
router
  .get("/me", checkToken, myaccountController.service)
  .get("/reset-password/:email", ResetPasswordController.service)
  .put("/update-profile", checkToken, (req, res, next) => {
    req.body.id = req.auth.id
    req.body.role = "user"
    next()
  }, updateUserController.validation, validator, updateUserController.service)
  .put("/change-password", checkToken, changePasswordController.validation, validator, changePasswordController.service)
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

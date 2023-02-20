const express = require("express");
const router = express.Router();
const signupController = require("../signup.userController");
const myaccountController = require("../myAccount.userController");
const ResetPasswordController = require("../resetPassword.userController");
const updateUserController = require("../update.userController");
const changePasswordController = require("../changePassword.userController");
const uploadFile = require("../../../services/uploadImage");
const addressRoutes = require("../address/routes/public");

const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtUser");

router
  .get("/me", checkToken, myaccountController.service)
  .get("/reset-password/:email", ResetPasswordController.service)
  .put(
    "/update-profile",
    checkToken,
    uploadFile.single("photo"),
    (req, res, next) => {
      req.body.id = req.auth.id;
      req.body.role = req.auth.role;
      req.body.email = req.auth.email;
      next();
    },
    updateUserController.validation,
    validator,
    updateUserController.service
  )
  .put("/change-password", checkToken, changePasswordController.validation, validator, changePasswordController.service)
  .post("/signup", signupController.validation, validator, signupController.service)
  .post(
    "/reset-password",
    ResetPasswordController.validationReset,
    validator,
    ResetPasswordController.setResetPassword
  );
router.use("/address", addressRoutes);

module.exports = router;

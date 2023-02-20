const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtAdmin");
const createUserController = require("../create.userController");
const getUserController = require("../get.userController");
const getListUserController = require("../getList.userController");
const updateUserController = require("../update.userController");
const deleteUserController = require("../delete.userController");
const changePasswordController = require("../changePassword.userController");
const uploadFile = require("../../../services/uploadImage");

router.post("/no-auth", createUserController.validation, validator, createUserController.service);
router.use(checkToken);
router
  .get("/admin", getUserController.service)
  .get("/admin/:id", getUserController.service)
  .get("/user", getListUserController.service)
  .get("/user/:id", getListUserController.service)
  .put("/", updateUserController.validation, validator, updateUserController.service)
  .delete("/:id", deleteUserController.service)
  .post("/", createUserController.validation, validator, createUserController.service)
  .get(
    "/me",
    (req, res, next) => {
      req.params.id = req.auth.id;
      next();
    },
    getUserController.service
  )
  .put("/change-password", checkToken, changePasswordController.validation, validator, changePasswordController.service)
  .put(
    "/update-myprofile",
    checkToken,
    uploadFile.single("photo"),
    (req, res, next) => {
      req.body.id = req.auth.id;
      req.body.role = req.auth.role;
      next();
    },
    updateUserController.validation,
    validator,
    updateUserController.service
  );

module.exports = router;

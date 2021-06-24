const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtAdmin");
const createUserController = require("../create.userController");
const getUserController = require("../get.userController");
const updateUserController = require("../update.userController");
const deleteUserController = require("../delete.userController");

router.post("/no-auth", createUserController.validation, validator, createUserController.service);
router.use(checkToken);
router
  .get("/", getUserController.service)
  .get("/:id", getUserController.service)
  .put("/", updateUserController.validation, validator, updateUserController.service)
  .delete("/:id", deleteUserController.service)
  .post("/", createUserController.validation, validator, createUserController.service)
  .get("/me", (req, res, next) => { req.params.id = req.auth.id; next() }, getUserController.service)
  .put("/update-myprofile", checkToken, (req, res, next) => {
    console.log(req.auth)
    req.body.id = req.auth.id
    req.body.role = req.auth.role
    next()
  }, updateUserController.validation, validator, updateUserController.service)

module.exports = router;

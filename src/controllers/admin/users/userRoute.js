const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtAdmin");
const createUser = require("./create.userController");
const getUser = require("./get.userController");
const updateUser = require("./update.userController");
const deleteUser = require("./delete.userController");

router.post("/no-auth", createUser.validation, validator, createUser.service);
router.use(checkToken);
router
  .post("/", createUser.validation, validator, createUser.service)
  .get("/", getUser.service)
  .get("/:id", getUser.service)
  .put("/", updateUser.validation, validator, updateUser.service)
  .delete("/:id", deleteUser.service);

module.exports = router;

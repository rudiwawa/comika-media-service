const express = require("express");
const router = express.Router();
const validator = require("../helpers/validator");
const { checkToken } = require("../middlewares/jwt");
const createUser = require("../controllers/users/create.userController");
const getUser = require("../controllers/users/get.userController");
const updateUser = require("../controllers/users/update.userController");
const deleteUser = require("../controllers/users/delete.userController");

router.post("/no-auth", createUser.validation, validator, createUser.service);
router.use(checkToken);
router
  .post("/", createUser.validation, validator, createUser.service)
  .get("/", getUser.service)
  .get("/:id", getUser.service)
  .put("/", updateUser.validation, validator, updateUser.service)
  .delete("/:id", deleteUser.service);

module.exports = router;

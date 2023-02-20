const express = require("express");
const router = express.Router();
const createPackage = require("../create.packageController");
const getPackage = require("../get.packageController");
const updatePackage = require("../update.packageController");
const deletePackage = require("../delete.packageController");
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtAdmin");

router.use(checkToken);
router
  .post("/", createPackage.validation, validator, createPackage.service)
  .get("/", getPackage.service)
  .get("/:id", getPackage.service)
  .put("/", updatePackage.validation, validator, updatePackage.service)
  .delete("/:id", deletePackage.service);

module.exports = router;

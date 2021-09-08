const express = require("express");
const router = express.Router();
const createAddress = require("../create.addressController");
const getAddress = require("../get.addressController");
const updateAddress = require("../update.addressController");
const deleteAddress = require("../delete.addressController");
const validator = require("../../../../helpers/validator");
const { checkToken } = require("../../../../middlewares/jwtUser");

router
  .post("/", checkToken, createAddress.validation, validator, createAddress.service)
  .get("/", checkToken, getAddress.service)
  .get("/:id", checkToken, getAddress.service)
  .put("/", checkToken, updateAddress.validation, validator, updateAddress.service)
  .delete("/:id", checkToken, deleteAddress.service);

module.exports = router;

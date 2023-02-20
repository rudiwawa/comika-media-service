const express = require("express");
const router = express.Router();
const createPromo = require("../create.promoController");
const getPromo = require("../get.promoController");
const updatePromo = require("../update.promoController");
const deletePromo = require("../delete.promoController");
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtAdmin");

router.use(checkToken);
router
  .post("/", createPromo.validation, validator, createPromo.service)
  .get("/", getPromo.service)
  .get("/:id", getPromo.service)
  .put("/", updatePromo.validation, validator, updatePromo.service)
  .delete("/:id", deletePromo.service);

module.exports = router;

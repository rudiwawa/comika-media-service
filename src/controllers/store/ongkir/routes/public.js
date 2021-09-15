const express = require("express");
const router = express.Router();
const validator = require("../../../../helpers/validator");
const getProvince = require("../getProvince.ongkirController");
const getCity = require("../getCity.ongkirController");
const getSubdistrict = require("../getSubdistrict.ongkirController");
const getCost = require("../getCost.ongkirController");

router
  .get("/master-province", getProvince.service)
  .get("/master-city", getCity.service)
  .get("/master-subdistrict", getSubdistrict.service)
  .get("/estimate-cost", getCost.validation, validator, getCost.service);

module.exports = router;

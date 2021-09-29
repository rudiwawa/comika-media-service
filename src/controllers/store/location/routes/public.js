const express = require("express");
const router = express.Router();
const getProvince = require("../getProvince.ongkirController");
const getCity = require("../getCity.ongkirController");
const getSubdistrict = require("../getSubdistrict.ongkirController");

router
  .get("/master-province", getProvince.service)
  .get("/master-city", getCity.service)
  .get("/master-subdistrict", getSubdistrict.service);

module.exports = router;

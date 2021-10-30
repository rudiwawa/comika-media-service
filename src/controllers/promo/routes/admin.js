const express = require("express");
const router = express.Router();
const createPromo = require("../create.promoController");
const validator = require("../../../helpers/validator");

router.post("/", createPromo.validation, validator, createPromo.service);

module.exports = router;

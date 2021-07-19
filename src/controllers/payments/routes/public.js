const express = require("express");
const router = express.Router();
const createSnap = require("../createSnap.subscribeController");
const callbackTransaction = require("../callback.subscribeController");
const { checkToken } = require("../../../middlewares/jwtUser");
const validator = require("../../../helpers/validator");

router.post("/callback", callbackTransaction.service);
router.post("/subscribe", checkToken, createSnap.validation, validator, createSnap.service);

module.exports = router;

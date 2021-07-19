const express = require("express");
const router = express.Router();
const createSnap = require("../createSnap.subscribeController");
const callbackTransaction = require("../callback.subscribeController");
const { checkToken } = require("../../../middlewares/jwtUser");
const validator = require("../../../helpers/validator");

router.use(checkToken);
router.post("/subscribe", createSnap.validation, validator, createSnap.service);
router.post("/callback", callbackTransaction.service);

module.exports = router;

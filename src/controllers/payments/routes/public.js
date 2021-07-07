const express = require("express");
const router = express.Router();
const createPayment = require("../create.subscribeController");
const callbackController = require("../callback.subscribeController");
const { checkToken } = require("../../../middlewares/jwtUser");
const validator = require("../../../helpers/validator");

router.use(checkToken);
router.post("/subscribe", createPayment.validation, validator, createPayment.service);
router.post("/subscribe-activation", callbackController.service);

module.exports = router;

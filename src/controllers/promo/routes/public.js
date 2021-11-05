const express = require("express");
const router = express.Router();
const getCodePromoController = require("../getCode.promoController");
const { checkToken } = require("../../../middlewares/jwtUser");
router.use(checkToken);
router.get("/:code", getCodePromoController.service);

module.exports = router;

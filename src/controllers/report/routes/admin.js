const express = require("express");
const router = express.Router();
const productReport = require("../product.reportController");
const productDetailReport = require("../productDetail.reportController");
const { checkToken } = require("../../../middlewares/jwtAdmin");

router.use(checkToken);
router.get("/data/:report", productReport.service);
router.get("/product/:id", productDetailReport.service);

module.exports = router;

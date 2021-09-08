const express = require("express");
const router = express.Router();
const listProductController = require("../getList.productController");
const detailProductController = require("../getDetail.productController");
const slugProduct = require("../../../middlewares/slugProduct");
const ongkirRoutes = require("../ongkir/routes/public");

router.get("/product", listProductController.service);
router.get("/product/:slug", slugProduct, detailProductController.service);
router.use("/ongkir", ongkirRoutes);

module.exports = router;

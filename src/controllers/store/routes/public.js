const express = require("express");
const router = express.Router();
const listProductController = require("../getList.productController");
const detailProductController = require("../getDetail.productController");
const createCartController = require("../cart/create.cartController");
const getCartController = require("../cart/get.cartController");
const getConfirmCartController = require("../cart/getConfirm.cartController");
const getCostEstimatation = require("../cart/getCostEstimation.cartController");
const checkoutController = require("../checkout.storeController");
const slugProduct = require("../../../middlewares/slugProduct");
const locationRoutes = require("../location/routes/public");
const validator = require("../../../helpers/validator");
const { checkToken } = require("../../../middlewares/jwtUser");

router.get("/product", listProductController.service);
router.get("/product/:slug", slugProduct, detailProductController.service);
router.use("/ongkir", checkToken, locationRoutes);
router.post("/add-cart/:id", checkToken, slugProduct, createCartController.service);
router.get("/cart", checkToken, getCartController.service);
router.get("/cart-estimation", getCostEstimatation.service);
router.post("/cart-checkout", checkoutController.validation, validator, checkToken, checkoutController.service);
router.get("/confirm-cart", checkToken, getConfirmCartController.service);

module.exports = router;

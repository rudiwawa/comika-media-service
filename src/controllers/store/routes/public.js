const express = require("express");
const router = express.Router();
const listProductController = require("../getList.productController");
router.get("/product", listProductController.service);

module.exports = router;

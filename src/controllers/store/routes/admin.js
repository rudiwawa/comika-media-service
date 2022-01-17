const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const uploadFile = require("../../../services/uploadImage");
const { checkToken } = require("../../../middlewares/jwtAdmin");
// Product
const createProduct = require("../product/create.productController");
const getProduct = require("../product/get.productController");
const getDetailProduct = require("../product/getDetail.productController");
const updateProduct = require("../product/update.productController");
const deleteProduct = require("../product/delete.productController");
// Category
const createCategory = require("../category/create.categoryController");
const getCategory = require("../category/get.categoryController");
const updateCategory = require("../category/update.categoryController");
const deleteCategory = require("../category/delete.categoryController");

// report order
const getOrderDelivery = require("../order/delivery.orderController");
const getOrderDetailDelivery = require("../order/detailDelivery.orderController");
const updateOrderDelivery = require("../order/updateResi.orderController");

router.use(checkToken);
router
  .post("/", createProduct.validation, validator, createProduct.service)
  .get("/", getProduct.service)
  .get("/:id", getDetailProduct.service)
  .put("/", updateProduct.validation, validator, updateProduct.service)
  .delete("/:id", deleteProduct.service);

router
  .post("/category", createCategory.validation, validator, createCategory.service)
  .get("/category", getCategory.service)
  .get("/category/:id", getCategory.service)
  .put("/category", updateCategory.validation, validator, updateCategory.service)
  .delete("/category/:id", deleteCategory.service);

router.get("/order/delivery", getOrderDelivery.service);
router.get("/order/delivery-detail/:id", getOrderDetailDelivery.service);
router.put("/order/delivery-update/:id", updateOrderDelivery.service);

module.exports = router;

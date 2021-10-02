const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const uploadFile = require("../../../services/uploadImage");
const { checkToken } = require("../../../middlewares/jwtAdmin");
// Product
const createProduct = require("../product/create.productController");
const getProduct = require("../product/get.productController");
const updateProduct = require("../product/update.productController");
const deleteProduct = require("../product/delete.productController");
// Category
const createCategory = require("../category/create.categoryController");
const getCategory = require("../category/get.categoryController");
const updateCategory = require("../category/update.categoryController");
const deleteCategory = require("../category/delete.categoryController");

router.use(checkToken);
router
  .post("/", createProduct.validation, validator, createProduct.service)
  .get("/", getProduct.service)
  .get("/:id", getProduct.service)
  .put("/", updateProduct.validation, validator, updateProduct.service)
  .delete("/:id", deleteProduct.service);

router
  .post("/category", createCategory.validation, validator, createCategory.service)
  .get("/category", getCategory.service)
  .get("/category/:id", getCategory.service)
  .put("/category", updateCategory.validation, validator, updateCategory.service)
  .delete("/category/:id", deleteCategory.service);

module.exports = router;

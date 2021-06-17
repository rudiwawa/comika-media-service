const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/jwt");
const upload = require("../services/uploadImage");
const createArticle = require("../controllers/articles/create.articleController");
const getArticle = require("../controllers/articles/get.articleController");
const updateArticle = require("../controllers/articles/update.articleController");
const deleteArticle = require("../controllers/articles/delete.articleController");
const validator = require("../helpers/validator");

router.use(checkToken);
router.post(
  "/",
  upload.single("article"),
  createArticle.validation,
  validator,
  createArticle.service
);
router.get("/", getArticle.service);
router.get("/:id", getArticle.service);
router.put(
  "/",
  upload.single("article"),
  updateArticle.validation,
  validator,
  updateArticle.service
);
router.delete("/:id", deleteArticle.service);

module.exports = router;

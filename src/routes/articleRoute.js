const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/jwt");
const upload = require("../services/uploadArticle");
const createArticle = require("../controllers/articles/create.articleController");
const getArticle = require("../controllers/articles/get.articleController");
const updateArticle = require("../controllers/articles/update.articleController");
const deleteArticle = require("../controllers/articles/delete.articleController");

router.use(checkToken);
router.post(
  "/",
  createArticle.validation,
  upload.single("banner"),
  createArticle.service
);
router.get("/", getArticle.service);
router.put(
  "/",
  updateArticle.validation,
  upload.single("banner"),
  updateArticle.service
);
router.delete("/", deleteArticle.service);

module.exports = router;

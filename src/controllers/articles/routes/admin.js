const express = require("express");
const router = express.Router();
const { checkToken } = require("../../../middlewares/jwtAdmin");
const upload = require("../../../services/uploadImage");
const validator = require("../../../helpers/validator");

const createArticle = require("../create.articleController");
const getArticle = require("../get.articleController");
const getAllArticle = require("../getAll.articleController");
const updateArticle = require("../update.articleController");
const deleteArticle = require("../delete.articleController");

router.use(checkToken);
router.post(
  "/",
  upload.single("banner"),
  createArticle.validation,
  validator,
  createArticle.service
);
router.get("/", getAllArticle.service);
router.get("/:id", getArticle.service);
router.put(
  "/",
  upload.single("banner"),
  updateArticle.validation,
  validator,
  updateArticle.service
);
router.delete("/:id", deleteArticle.service);

module.exports = router;

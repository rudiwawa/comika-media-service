const express = require("express");
const router = express.Router();
const listArticle = require("../list.articleController");
const detailArticle = require("../detail.articleController");
const slugArticle = require("../../../middlewares/slugArticle");

router.get("/", listArticle.service);
router.get("/:slug", slugArticle, detailArticle.service);

module.exports = router;

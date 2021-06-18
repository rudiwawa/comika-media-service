const express = require("express");
const router = express.Router();
const listArticle = require("./list.articleController");
const detailArticle = require("./detail.articleController");

router.get("/", listArticle.service);
router.get("/:id", detailArticle.service);

module.exports = router;

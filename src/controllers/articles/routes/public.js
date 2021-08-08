const express = require("express");
const router = express.Router();
const listArticle = require("../list.articleController");
const detailArticle = require("../detail.articleController");
const shareArticle = require("../share.articleController");
const setBookmark = require("../bookmarks/setBookmark.articleController");
const listBookmark = require("../bookmarks/listBookmark.articleController");
const slugArticle = require("../../../middlewares/slugArticle");
const { checkToken } = require("../../../middlewares/jwtUser");

router.get("/", listArticle.service);
router.get("/:slug", slugArticle, detailArticle.service);
router.post("/share/:slug", slugArticle, shareArticle.service);
router.post("/bookmark/:slug", checkToken, slugArticle, setBookmark.service);
router.get("/bookmark/me", checkToken, listBookmark.service);

module.exports = router;

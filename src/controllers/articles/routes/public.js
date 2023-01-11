const express = require("express");
const router = express.Router();
const listArticle = require("../list.articleController");
const detailArticle = require("../detail.articleController");
const shareArticle = require("../share.articleController");
const setBookmark = require("../bookmarks/setBookmark.articleController");
const setLike = require("../like/setLike.articleController");
const listBookmark = require("../bookmarks/listBookmark.articleController");
const slugArticle = require("../../../middlewares/slugArticle");
const emailSubscription = require("../email-subscription/createl.emailSubscriptionController");
const { checkToken } = require("../../../middlewares/jwtUser");
const validator = require("../../../helpers/validator");

router.get("/", listArticle.service);
router.get("/:slug", slugArticle, detailArticle.service);
router.post("/share/:slug", slugArticle, shareArticle.service);
router.post("/bookmark/:slug", checkToken, slugArticle, setBookmark.service);
router.post("/like/:slug", checkToken, slugArticle, setLike.service);
router.get("/bookmark/me", checkToken, listBookmark.service);
router.post("/email-subscription", emailSubscription.validation, validator, emailSubscription.service);

module.exports = router;

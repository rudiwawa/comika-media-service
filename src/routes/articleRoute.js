const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/jwt");
const upload = require("../services/uploadArticle");
const createArticle = require("../controllers/articles/create.articleController");

router.use(checkToken);
router.post("/", upload.single("banner"), createArticle.service);

module.exports = router;

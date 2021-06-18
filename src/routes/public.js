const express = require("express");
const router = express.Router();
const { ifHasToken } = require("../middlewares/jwtUser");

router.use(ifHasToken);
router.use("/", require("../controllers/public/auth/authUserRoute"));
router.use("/article", require("../controllers/public/article/articleRoute"));
module.exports = router;

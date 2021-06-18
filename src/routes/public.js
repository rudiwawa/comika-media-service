const express = require("express");
const router = express.Router();
const { ifHasToken } = require("../middlewares/jwtUser");

router.use(ifHasToken);
router.use("/", require("../controllers/public/auth/authUserRoute"));
router.get(
  "/dummy",
  (req, res, next) => {
    res.response = { msg: "DUMMY API" };
    next();
  },
  require("../controllers/public/dummy/userDummy").service,
  require("../controllers/public/dummy/articleDummy").service
);
router.use("/article", require("../controllers/public/article/articleRoute"));
module.exports = router;

const express = require("express");
const router = express.Router();

const { ifHasToken } = require("../middlewares/jwtUser");
const authRoutes = require("../controllers/auth/routes/public");
const jumbotronRoutes = require("../controllers/jumbotrons/routes/public");
const accountRoutes = require("../controllers/users/routes/public");
const articleRoutes = require("../controllers/articles/routes/public");
const commentRoutes = require("../controllers/comments/routes/public");
const paymentsRoutes = require("../controllers/payments/routes/public");

router.use(ifHasToken);
router.use("/", authRoutes);
router.use("/jumbotron", jumbotronRoutes);
router.use("/account", accountRoutes);
router.use("/article", articleRoutes);
router.use("/comment", commentRoutes);
router.use("/payment", paymentsRoutes);
router.get(
  "/dummy",
  require("../controllers/dummy/userDummy").service,
  require("../controllers/dummy/comikaDummy").service,
  require("../controllers/dummy/articleDummy").service,
  require("../controllers/dummy/jumbotronDummy").service,
  (req, res, next) => {
    res.response = { msg: "DUMMY API" };
    next();
  }
);
module.exports = router;

const express = require("express");
const router = express.Router();

const { ifHasToken } = require("../middlewares/jwtUser");
const authRoutes = require("../controllers/auth/routes/public");
const jumbotronRoutes = require("../controllers/jumbotrons/routes/public");
const accountRoutes = require("../controllers/users/routes/public");
const articleRoutes = require("../controllers/articles/routes/public");
const commentRoutes = require("../controllers/comments/routes/public");
const paymentsRoutes = require("../controllers/subscription/routes/public");
const packageRoutes = require("../controllers/packages/routes/public");
const storeRoutes = require("../controllers/store/routes/public");
const notifRoutes = require("../controllers/notifications/routes/public");

router.use(ifHasToken);
router.use("/", authRoutes);
router.use("/jumbotron", jumbotronRoutes);
router.use("/account", accountRoutes);
router.use("/article", articleRoutes);
router.use("/comment", commentRoutes);
router.use("/payment", paymentsRoutes);
router.use("/package", packageRoutes);
router.use("/store", storeRoutes);
router.use("/notification", notifRoutes);

module.exports = router;

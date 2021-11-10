const express = require("express");
const router = express.Router();
const authRoutes = require("../controllers/auth/routes/admin");
const userRoutes = require("../controllers/users/routes/admin");
const articleRoutes = require("../controllers/articles/routes/admin");
const jumbotronRoutes = require("../controllers/jumbotrons/routes/admin");
const comikaRoutes = require("../controllers/comika/routes/admin");
const sourceRoutes = require("../controllers/source/routes/admin");
const packageRoutes = require("../controllers/packages/routes/admin");
const subscriptionRoutes = require("../controllers/subscription/routes/admin");
const storeRoutes = require("../controllers/store/routes/admin");
const promoRoutes = require("../controllers/promo/routes/admin");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/article", articleRoutes);
router.use("/jumbotron", jumbotronRoutes);
router.use("/comika", comikaRoutes);
router.use("/source", sourceRoutes);
router.use("/package", packageRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/store", storeRoutes);
router.use("/promo", promoRoutes);
module.exports = router;

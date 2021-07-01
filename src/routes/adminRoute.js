const express = require("express");
const router = express.Router();
const authRoutes = require("../controllers/auth/routes/admin");
const userRoutes = require("../controllers/users/routes/admin");
const articleRoutes = require("../controllers/articles/routes/admin");
const jumbotronRoutes = require("../controllers/jumbotrons/routes/admin");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/article", articleRoutes);
router.use("/jumbotron", jumbotronRoutes);
module.exports = router;
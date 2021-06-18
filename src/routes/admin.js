const express = require("express");
const router = express.Router();
router.use("/", require("../controllers/admin/auth/authAdminRoute"));
router.use("/users", require("../controllers/admin/users/userRoute"));
router.use("/article", require("../controllers/admin/articles/articleRoute"));
router.use("/jumbotron", require("../controllers/admin/jumbotrons/jumbotronRoute"));
module.exports = router;

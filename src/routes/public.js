const express = require("express");
const router = express.Router();
router.use("/", require("../controllers/public/auth/authUserRoute"));
module.exports = router;

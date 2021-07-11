const express = require("express");
const router = express.Router();

router.get("/", require("../get.packageController").service);
router.get("/:id", require("../get.packageController").service);

module.exports = router;

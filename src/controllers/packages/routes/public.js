const express = require("express");
const router = express.Router();

router.get("/", require("../getList.packageController").service);

module.exports = router;

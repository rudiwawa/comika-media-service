const express = require("express");
const router = express.Router();
const { checkToken } = require("../../../middlewares/jwtAdmin");

router.use(checkToken);
router.get("/report-user", require("../reportUser.subscribeController").service);

module.exports = router;

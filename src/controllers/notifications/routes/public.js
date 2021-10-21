const express = require("express");
const router = express.Router();
const listNotification = require("../getList.notificationController");
const { checkToken } = require("../../../middlewares/jwtUser");

router.get("/", checkToken, listNotification.service);

module.exports = router;

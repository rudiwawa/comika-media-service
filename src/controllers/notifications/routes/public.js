const express = require("express");
const router = express.Router();
const listNotification = require("../getList.notificationController");
const getDetailNotification = require("../getDetail.notificationController");
const { checkToken } = require("../../../middlewares/jwtUser");
const unreadNotification = require("../unread.notificationController");

router.get("/", checkToken, listNotification.service);
router.get("/:id", checkToken, getDetailNotification.service);
router.get("/unread", checkToken, unreadNotification.service);

module.exports = router;

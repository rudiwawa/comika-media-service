const express = require("express");
const router = express.Router();
const createNotification = require("../create.notificationController");
const validator = require("../../../helpers/validator");

router.post("/", createNotification.validation, validator, createNotification.service);
module.exports = router;

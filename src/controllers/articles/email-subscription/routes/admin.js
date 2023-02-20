const express = require("express");
const router = express.Router();
const validator = require("../../../../helpers/validator");
const { checkToken } = require("../../../../middlewares/jwtAdmin");
const getEmailSubscription = require("../get.emailSubscriptionController");

router.use(checkToken);
router.get("/", getEmailSubscription.service)

module.exports = router;

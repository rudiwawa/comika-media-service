const express = require("express");
const router = express.Router();
const validator = require("../../../../helpers/validator");
const { checkToken } = require("../../../../middlewares/jwtAdmin");
const createTag = require("../create.tagController");
const getTag = require("../get.tagController");
const updateTag = require("../update.tagController");
const deleteTag = require("../delete.tagController");

router.use(checkToken);
router
  .post("/", createTag.validation, validator, createTag.service)
  .get("/", getTag.service)
  .get("/:id", getTag.service)
  .put("/", updateTag.validation, validator, updateTag.service)
  .delete("/:id", deleteTag.service);

module.exports = router;

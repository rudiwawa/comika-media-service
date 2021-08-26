const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const uploadFile = require("../../../services/uploadImage");
const { checkToken } = require("../../../middlewares/jwtAdmin");
const createSource = require("../create.srcController");
const getSource = require("../get.srcController");
const updateSource = require("../update.srcController");
const deleteSource = require("../delete.srcController");

router.use(checkToken);
router
  .post("/", [uploadFile.single("src")], createSource.service)
  .get("/", getSource.service)
  .get("/:id", getSource.service)
  .put("/", uploadFile.single("src"), updateSource.service)
  .delete("/:id", deleteSource.service);

module.exports = router;

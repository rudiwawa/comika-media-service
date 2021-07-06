const express = require("express");
const router = express.Router();
const validator = require("../../../helpers/validator");
const uploadFile = require("../../../services/uploadImage");
const { checkToken } = require("../../../middlewares/jwtAdmin");
const createComika = require("../create.comikaController");
const getComika = require("../get.comikaController");
const updateComika = require("../update.comikaController");
const deleteComika = require("../delete.comikaController");

router.use(checkToken);
router
  .post("/", uploadFile.single("photo"), createComika.validation, validator, createComika.service)
  .get("/", getComika.service)
  .get("/:id", getComika.service)
  .put("/", uploadFile.single("photo"), updateComika.validation, validator, updateComika.service)
  .delete("/:id", deleteComika.service);

module.exports = router;

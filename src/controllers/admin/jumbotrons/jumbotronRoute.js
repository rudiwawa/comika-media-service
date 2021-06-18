const express = require("express");
const router = express.Router();
const createJumbotron = require("./create.jumbotronController");
const getJumbotron = require("./get.jumbotronController");
const updateJumbotron = require("./update.jumbotronController");
const deleteJumbotron = require("./delete.jumbotronController");

const { checkToken } = require("../../../middlewares/jwtAdmin");
const validator = require("../../../helpers/validator");
const upload = require("../../../services/uploadImage");

router.use(checkToken);
router
  .post("/", upload.single("img"), createJumbotron.service)
  .get("/", getJumbotron.service)
  .get("/:id", getJumbotron.service)
  .put(
    "/",
    upload.single("img"),
    updateJumbotron.validation,
    validator,
    updateJumbotron.service
  )
  .delete("/:id", deleteJumbotron.service);

module.exports = router;

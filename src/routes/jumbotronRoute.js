const express = require("express");
const router = express.Router();
const createJumbotron = require("../controllers/jumbotrons/create.jumbotronController");
const getJumbotron = require("../controllers/jumbotrons/get.jumbotronController");
const updateJumbotron = require("../controllers/jumbotrons/update.jumbotronController");
const deleteJumbotron = require("../controllers/jumbotrons/delete.jumbotronController");
const { checkToken } = require("../middlewares/jwt");
const validator = require("../helpers/validator");
const upload = require("../services/uploadImage");

router.use(checkToken);
router
  .post("/", upload.single("jumbotron"), createJumbotron.service)
  .get("/", getJumbotron.service)
  .get("/:id", getJumbotron.service)
  .put(
    "/",
    upload.single("jumbotron"),
    updateJumbotron.validation,
    validator,
    updateJumbotron.service
  )
  .delete("/:id", deleteJumbotron.service);

module.exports = router;

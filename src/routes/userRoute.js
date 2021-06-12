const express = require("express");
const router = express.Router();

router
  .post("/", require("../controllers/users/create.userController"))
  .get("/", require("../controllers/users/get.userController"))
  .get("/:id", require("../controllers/users/get.userController"))
  .put("/:id", require("../controllers/users/update.userController"))
  .delete("/:id", require("../controllers/users/delete.userController"));

module.exports = router;

const express = require("express");
const router = express.Router();
const { ifHasToken } = require("../middlewares/jwtUser");

router.use(ifHasToken);
router.use("/", require("../controllers/public/auth/authUserRoute"));
router.use(
  "/jumbotron",
  require("../controllers/public/jumbotron/jumbotronRoute")
);
router.use("/account", require("../controllers/public/users/usersRoute"));
router.use("/article", require("../controllers/public/article/articleRoute"));
router.get(
  "/dummy",
  (req, res, next) => {
    res.response = { msg: "DUMMY API" };
    next();
  },
  require("../controllers/public/dummy/userDummy").service,
  require("../controllers/public/dummy/articleDummy").service,
  require("../controllers/public/dummy/jumbotronDummy").service
);
module.exports = router;

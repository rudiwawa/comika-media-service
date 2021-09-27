const {
  Comment,
  Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");
const moment = require("moment");
const service = async function (req, res, next) {
  try {
    const payload = {
      articleId: req.article.id,
      userId: req.auth.id,
      comment: req.body.comment,
    };
    const requestDB = await Comment.create(payload);
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("comment")
    .notEmpty()
    .withMessage("komentar tidak boleh kosong")
    .isLength({ min: 10 })
    .withMessage("komentar minimal 10 karakter")
    .trim()
    .escape(),
];
module.exports = { service, validation };

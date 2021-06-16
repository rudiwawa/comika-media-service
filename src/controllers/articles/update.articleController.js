const { Article } = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  const body = req.body;
  const payload = {
    title: body.title,
    content: body.content,
    isPremium: body.isPremium,
    userId: req.auth.id,
  };
  if (req.file) payload.banner = req.file.path;
  try {
    const requestDB = await Article.update(payload, { where: { id: body.id } });
    req.response = {
      msg: `Article ${body.title} berhasil diubah`,
      data: requestDB,
    };
  } catch (error) {
    req.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("id").notEmpty(),
  body("title").notEmpty(),
  body("content").notEmpty(),
];

module.exports = { service, validation };

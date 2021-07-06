const { Article } = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  const body = req.body;
  const payload = {
    title: body.title,
    content: body.content,
    isPremium: body.isPremium,
    isPublish: body.isPublish,
    userId: req.auth.id,
    comikaId: body.comikaId,
  };
  if (req.file) payload.banner = req.urlApps + req.file.path;
  try {
    const requestDB = await Article.update(payload, { where: { id: body.id } });
    if (requestDB[0]) {
      res.response = {
        msg: `Article ${body.title} berhasil diubah`,
      };
    } else {
      res.response = {
        msg: `Article ${body.title} gagal diubah`,
      };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("id", "id tidak boleh kosong").notEmpty(),
  body("title", "title tidak boleh kosong").notEmpty(),
  body("content", "content tidak boleh kosong").notEmpty(),
  body("comikaId", "comika tidak boleh kosong").notEmpty(),
];

module.exports = { service, validation };

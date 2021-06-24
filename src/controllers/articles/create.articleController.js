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
  };
  if (req.file) payload.banner = req.urlApps + req.file.path;
  try {
    const requestDB = await Article.create(payload);
    res.response = {
      msg: `Article ${body.title} berhasil ditambahkan`,
      data: requestDB,
    };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};
const validation = [
  body("title", "title tidak boleh kosong").notEmpty()
    .custom((value) => {
      return Article.findOne({ where: { title: value } }).then((article) => {
        if (article) {
          return Promise.reject("Judul sudah digunakan");
        }
      });
    }),
  body("content", "content tidak boleh kosong").notEmpty(),
];

module.exports = { service, validation };

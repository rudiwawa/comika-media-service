const { Article } = require("../../models");

const service = async function (req, res, next) {
  const body = req.body;
  const payload = {
    banner: req.file.path,
    title: body.title,
    content: body.content,
    userId: req.auth.id,
  };
  try {
    const requestDB = await Article.create(payload);
    req.response = {
      msg: `Article ${body.title} berhasil ditambahkan`,
      data: requestDB,
    };
  } catch (error) {
    req.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

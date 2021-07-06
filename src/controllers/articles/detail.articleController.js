const { Article, Visitor } = require("../../models");

const service = async (req, res, next) => {
  try {
    const payload = {
      articleId: req.article.id,
      userId: req.auth ? req.auth.id : null,
    };
    Visitor.create(payload);
    res.response = { data: req.article };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

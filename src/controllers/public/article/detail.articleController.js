const { Article, Visitor } = require("../../../models");

const service = async (req, res, next) => {
  try {
    const where = { slug: req.params.id };
    const requestDB = await Article.findOne({
      where,
    });
    if (!requestDB) {
      res.response = { status: 404, msg: "article not found" };
    } else {
      const payload = {
        articleId: req.params.id,
        userId: req.auth ? req.auth.id : null,
      };
      Visitor.create(payload);
      res.response = { data: requestDB };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

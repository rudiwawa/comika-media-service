const { Article, Visitor, sequelize } = require("../../../models");

const service = async (req, res, next) => {
  try {
    const where = { id: req.params.id };
    const requestDB = await Article.findOne({
      where,
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM visitors
              WHERE article_id = Article.id
              )`),
            "viewer",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM shares
              WHERE article_id = Article.id
              )`),
            "shared",
          ],
        ],
      },
    });
    if (!requestDB) {
      res.response = { status: 404, msg: "article not found" };
    } else {
      const payload = {
        articleId: req.params.id,
        userId: req.auth ? req.auth.id : "user",
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

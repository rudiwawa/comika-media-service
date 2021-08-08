const { Article, Record, sequelize } = require("../models");

module.exports = async function (req, res, next) {
  try {
    const where = { slug: req.params.slug };
    const requestDB = await Article.scope("public").findOne({
      attributes: {
        include: req.auth
          ? [
              [
                sequelize.literal(`(
            SELECT COUNT(*) FROM bookmarks
            WHERE article_id = "Article"."id" AND user_id = '${req.auth.id}' AND deleted_at IS NULL
            )`),
                "bookmarked",
              ],
            ]
          : [[sequelize.literal(`(SELECT '0')`), "bookmarked"]],
      },
      where,
    });
    if (!requestDB) {
      req.record.status = 404;
      req.record.msg = `artikel ${req.params.slug} tidak diketahui`;
      Record.create(req.record);
      return res.status(404).json({ msg: `artikel ${req.params.slug} tidak diketahui` });
    } else {
      req.article = requestDB.dataValues;
      next();
    }
  } catch (error) {
    req.record.status = 500;
    req.record.msg = error.message;
    Record.create(req.record);
    return res.status(500).json({ msg: error.message });
  }
};

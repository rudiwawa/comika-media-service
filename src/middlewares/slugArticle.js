const { Article, Record, sequelize, Sequelize } = require("../models");
const moment = require("moment");
module.exports = async function (req, res, next) {
  try {
    const where = {
      slug: req.params.slug,
      publishedAt: {
        [Sequelize.Op.lte]: moment().add(7, "hours"),
      },
    };
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
              [
                sequelize.literal(`(
            SELECT COUNT(*) FROM likes
            WHERE article_id = "Article"."id" AND user_id = '${req.auth.id}'
            )`),
                "liked",
              ],
            ]
          : [
              [sequelize.literal(`(SELECT false)`), "bookmarked"],
              [sequelize.literal(`(SELECT false)`), "liked"],
            ],
      },
      where,
    });
    if (!requestDB) {
      req.record.status = 404;
      req.record.msg = `artikel ${req.params.slug} tidak ditemukan`;
      Record.create(req.record);
      return res.status(404).json({ msg: `artikel ${req.params.slug} tidak ditemukan` });
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

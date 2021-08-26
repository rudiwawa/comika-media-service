const { Bookmark, Article, sequelize, Sequelize } = require("../../../models");
const moment = require("moment");
const service = async function (req, res, next) {
  try {
    const requestDB = await Article.scope("public").findAll({
      attributes: {
        exclude: ["content", "comikaId", "UserId", "userId", "ComikaId"],
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM bookmarks
              WHERE article_id = "Article"."id" AND user_id = '${req.auth.id}' AND deleted_at IS NULL
              )`),
            "bookmarked",
          ],
        ],
      },
      where: {
        publishedAt: {
          [Sequelize.Op.lte]: moment().add(7, "hours"),
        },
      },
      include: [{ model: Bookmark, where: { userId: req.auth.id }, attributes: [] }],
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.messsage };
  }
  next();
};

module.exports = { service };

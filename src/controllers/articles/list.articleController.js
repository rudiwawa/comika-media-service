const { Article, Sequelize, sequelize } = require("../../models");
const service = async function (req, res, next) {
  try {
    let limit = 10;
    let offset = 0;
    let order = [];
    let search = req.query.search || "";

    if (req.query.limit && req.query.limit > 0) {
      limit = Number(req.query.limit);
    }
    if (req.query.page && req.query.page > 0) {
      offset = Number(req.query.page - 1) * limit;
    }
    if (req.query.orderBy) {
      const ordering = req.query.ordering ? (req.query.ordering == "ASC" ? req.query.ordering : "DESC") : "DESC";
      switch (req.query.orderBy) {
        case "popular":
          order.push([Sequelize.literal("viewer"), ordering]);
          break;
        case "shared":
          order.push([Sequelize.literal("shared"), ordering]);
          break;
        case "title":
          order.push(["title", ordering]);
          break;
        case "isPremium":
          order.push(["isPremium", ordering]);
          break;
        case "createdAt":
          order.push(["createdAt", ordering]);
          break;
      }
    }
    order.push(["updatedAt", "DESC"]);
    const requestDB = await Article.scope("public").findAll({
      attributes: {
        exclude: ["content", "comikaId", "UserId", "userId", "ComikaId"],
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
      where: {
        title: {
          [Sequelize.Op.substring]: search,
        },
        publishedAt: {
          [Sequelize.Op.lte]: moment().add(7, "hours"),
        },
      },
      order,
      limit,
      offset,
    });
    if (req.query.id && !requestDB.length) {
      res.response = { status: 404, msg: "article not found" };
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

const { Article, Sequelize } = require("../../models");

const service = async function (req, res, next) {
  try {
    let limit = 3;
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
      const ordering = req.query.ordering
        ? req.query.ordering == "ASC"
          ? req.query.ordering
          : "DESC"
        : "DESC";
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
      attributes: { exclude: ["content", "comikaId", "UserId", "userId", "ComikaId"] },
      where: {
        isPublish: true,
        title: {
          [Sequelize.Op.substring]: search,
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

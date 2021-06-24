const { Article, Sequelize: { Op } } = require("../../models");

const service = async function (req, res, next) {
  try {
    let search = req.query.search ?? ""
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    let page =
      req.query.page && req.query.page > 0 ? Number(req.query.page) : 1;
    let offset = page ? (page - 1) * limit : 0;
    const { rows, count } = await Article.findAndCountAll({
      attributes: ["id", "title", "isPremium", "isPublish", "updatedAt"],
      where: {
        title: {
          [Op.substring]: search
        }
      },
      limit,
      offset,
    });
    res.response = {
      etc: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit),
        data: rows,
      },
    };
  } catch (err) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};

module.exports = { service };

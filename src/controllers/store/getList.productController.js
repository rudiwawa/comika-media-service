const { Product, Category, StoreProductSource, Source, Sequelize } = require("../../models");
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
    // if (req.query.orderBy) {
    //   const ordering = req.query.ordering ? (req.query.ordering == "ASC" ? req.query.ordering : "DESC") : "DESC";
    //   order.push([req.query.orderBy, ordering]);
    // }
    const where = {
      name: {
        [Sequelize.Op.substring]: search,
      },
      type: "product",
    };
    if (req.query.category) where.category = req.query.category;

    order.push(["updatedAt", "DESC"]);
    const requestDB = await Product.scope("product").findAll({
      attributes: {
        exclude: ["CategoryId", "description", "sequence", "capacity", "isPublish", "availableTo"],
      },
      where,
      order,
      limit,
      offset,
    });
    if (req.query.id && !requestDB.length) {
      res.response = { status: 404, msg: "product not found" };
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

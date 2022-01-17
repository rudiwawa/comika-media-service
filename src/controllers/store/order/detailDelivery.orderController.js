const { OrderDelivery, Order, OrderDetails } = require("../../../models");

const service = async (req, res, next) => {
  try {
    const result = await OrderDelivery.findOne({
      attributes: [
        "id",
        "noResi",
        "total",
        "province",
        "city",
        "subdistrict",
        "qty",
        "phone",
        "name",
        "address",
        "courier",
        "status",
      ],
      include: [
        {
          as: "storeDetails",
          model: Order,
          attributes: ["code", "paymentType"],
          where: [{ status: "settlement" }],
          include: [
            {
              as: "details",
              model: OrderDetails,
              attributes: ["name", "quantity", "img", "price", "priceRp", "total", "totalRp"],
              where: [{ type: "product" }],
            },
          ],
        },
      ],
      where: [{ id: req.params.id }],
    });
    if (result) res.response = { data: result };
    else res.response = { status: 404, msg: "data not found" };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

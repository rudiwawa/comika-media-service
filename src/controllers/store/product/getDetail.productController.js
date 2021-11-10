const { Product, StoreProductSource, Source } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const requestDB = await Product.findOne({
      where: { type: "product", id: req.params.id },
      include: [
        {
          attributes: ["thumbnail", "sourceId"],
          model: StoreProductSource,
          as: "images",
          order: [["thumbnail", "DESC"]],
          include: {
            as: "source",
            model: Source,
            attributes: ["url", "name"],
          },
        },
      ],
      order: [[{ model: StoreProductSource, as: "images" }, "thumbnail", "DESC"]],
    });

    if (requestDB) {
      let response = requestDB.dataValues;
      const images = requestDB.images.map((item) => {
        const data = {
          thumbnail: item.thumbnail,
          sourceId: item.sourceId,
          name: item.source.name,
          url: item.source.url,
        };
        return data;
      });
      res.response = { data: { ...response, images } };
    } else res.response = { status: 404, msg: "produk tidak ditemukan" };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

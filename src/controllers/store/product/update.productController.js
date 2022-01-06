const {
  Product,
  StoreProductSource,
  Sequelize: { Op },
} = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      type: "product",
      redirect: req.body.redirect,
      categoryId: req.body.categoryId,
      isPublish: req.body.isPublish,
      publishedAt: req.body.publishedAt,
    };
    const updateProduct = await Product.update(payload, { where: { id: req.body.id } });
    StoreProductSource.destroy({ where: { productId: req.body.id } });
    const productSources = req.body.images.map((item, i) => {
      return {
        productId: req.body.id,
        sourceId: item.sourceId,
        thumbnail: i === 0 ? true : false,
      };
    });
    StoreProductSource.bulkCreate(productSources);
    res.response = { msg: `Produk store berhasil diubah`, data: req.body };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name", "name tidak boleh kosong").notEmpty(),
  body().custom((body) => {
    return Product.findOne({ where: { name: body.name, type: "product", id: { [Op.ne]: body.id } } }).then(
      (product) => {
        if (product) {
          return Promise.reject("nama item sudah digunakan");
        }
      }
    );
  }),
  body("id", "id tidak boleh kosong").notEmpty(),
  body("price", "harga produk tidak boleh kosong").notEmpty(),
  body("category", "kategori tidak boleh kosong").notEmpty(),
  body("description", "deskripsi produk tidak boleh kosong").notEmpty(),
  // body("images", "gambar tidak boleh kosong").isArray({ min: 1 }),
];

module.exports = { service, validation };

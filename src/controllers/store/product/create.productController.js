const { Product, StoreProductSource } = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      type: "product",
      isPublish: req.body.isPublish,
      publishedAt: req.body.publishedAt,
    };
    const createProduct = await Product.create(payload);
    const payloadImage = req.body.images.map((item, i) => {
      item.productId = createProduct.dataValues.id;
      item.thumbnail = i === 0 ? true : false;
      return item;
    });
    StoreProductSource.bulkCreate(payloadImage);
    res.response = {
      msg: `Source berhasil ditambahkan`,
      data: req.body,
    };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name", "nama produk tidak boleh kosong")
    .notEmpty()
    .custom((value) => {
      return Product.findOne({ where: { name: value, type: "product" } }).then((product) => {
        if (product) {
          return Promise.reject("nama item sudah digunakan");
        }
      });
    }),
  body("category", "kategori tidak boleh kosong").notEmpty(),
  body("price", "harga produk tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("harga tidak boleh kurang dari 0"),
  body("description", "deskripsi produk tidak boleh kosong").notEmpty(),
  body("images", "gambar tidak boleh kosong").isArray({ min: 1 }),
];

module.exports = { service, validation };

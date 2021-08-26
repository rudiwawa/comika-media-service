const { Product } = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
      price: req.body.price,
    };
    const createProduct = await Product.create(payload);
    const productToSource = await createProduct.addSource(req.body.images);
    res.response = {
      msg: `Source berhasil ditambahkan`,
      data: req.body,
    };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.response,
    };
  }
  next();
};

const validation = [
  body("name", "nama produk tidak boleh kosong")
    .notEmpty()
    .custom((value) => {
      return Product.findOne({ where: { name: value } }).then((product) => {
        if (product) {
          return Promise.reject("nama item sudah digunakan");
        }
      });
    }),
  body("categoryId", "kategori tidak boleh kosong").notEmpty(),
  body("price", "harga produk tidak boleh kosong").notEmpty(),
  body("description", "deskripsi produk tidak boleh kosong").notEmpty(),
  body("images", "gambar tidak boleh kosong").isArray({ min: 1 }),
];

module.exports = { service, validation };

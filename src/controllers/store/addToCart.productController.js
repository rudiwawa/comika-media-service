const { Cart } = require("../../models");

const service = async function (req, res, next) {
  try {
    const { body, product, auth } = req;
    const where = { productId: product.id, userId: auth.id };
    const payload = {
      productId: product.id,
      userId: auth.id,
      note: body.note,
      qty: body.qty,
      price: product.price,
      total: body.qty * product.price,
    };
    const [cart, created] = await Cart.findOrCreate({ where, defaults: payload });
    if (created) {
      res.response = { status: 200, msg: product.name + " berhasil ditambahkan ke keranjang" };
    }
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

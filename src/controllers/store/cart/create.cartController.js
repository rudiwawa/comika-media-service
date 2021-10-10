const { CartTemp } = require("../../../models");
const service = async function (req, res, next) {
  try {
    if (req.body.qty < 0) throw new Error("Kuantitas tidak diperbolehkan");
    if (req.body.qty === 0 && !req.body.update) throw new Error("Kuantitas tidak boleh 0");
    const { body, product, auth } = req;
    const where = { productId: product.id, userId: auth.id };
    const payload = {
      productId: product.id,
      userId: auth.id,
      note: body.note,
      img: product.images[0].source.url,
      qty: body.qty,
    };
    const [cart, created] = await CartTemp.findOrCreate({ where, defaults: payload });
    if (created) {
      res.response = { msg: product.name + " berhasil ditambahkan ke keranjang", data: payload };
    } else {
      if (body.update) {
        if (body.qty) cart.qty = body.qty;
      } else cart.qty += body.qty;
      cart.note = body.note;
      cart.img = product.images[0].source.url;
      await cart.save();
      const action = body.update > 0 ? "mengubah" : "menambah";
      if (body.qty > 0) {
        res.response = {
          msg: `berhasil ${action} menjadi ${cart.qty} buah ` + product.name + " ke keranjang",
          data: cart,
        };
      } else if (body.update && body.qty == 0) {
        res.response = {
          msg: product.name + " dihapus dari keranjang",
        };
      }
    }
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };

const confirmCart = require("./cart.service");
const service = async (req, res, next) => {
  try {
    let listProduct = req.query.product;
    const promoCode = req.query.promo;
    const { showAddress, cart, promo } = await confirmCart(req.auth.id, listProduct, promoCode);
    if (promo) cart.push(promo);
    res.response = { data: { showAddress, cart } };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

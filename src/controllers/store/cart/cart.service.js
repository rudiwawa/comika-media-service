const {
  CartTemp,
  Promo,
  Sequelize: { Op },
} = require("../../../models");
const { getPromoByCode, implementPromo } = require("../../promo/getPromoByCode.service");

module.exports = async (userId, listProduct, promoCode) => {
  if (promoCode && typeof promoCode !== "string") throw new Error("diskon tidak valid");
  if (typeof listProduct === "string") {
    listProduct = [listProduct];
  }
  if (!listProduct) {
    throw new Error("kerenjang produk tidak boleh kosong");
  }
  const where = { userId, qty: { [Op.gt]: 0 }, id: { [Op.in]: listProduct } };
  let listCart = await CartTemp.scope("cart").findAll({ where });
  let showAddress = false;
  let promo = null;
  if (promoCode) {
    promo = await getPromoByCode(promoCode);
  }
  listCart.map((item) => {
    if (item.type === "product") showAddress = true;
  });
  return { showAddress: showAddress, cart: listCart, promo: promo && implementPromo(promo, listCart) };
};

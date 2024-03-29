const {
  Product,
  Sequelize: { Op },
} = require("../../models");
const { setRupiah } = require("../../helpers/currency");
const { v4: uuidv5 } = require("uuid");
const moment = require("moment");

const getPromoByCode = async function (code) {
  const requestDB = await Product.scope("promoActive").findOne({
    where: {
      slug: code,
      publishedAt: {
        [Op.lte]: moment().add(7, "hours"),
      },
      availableTo: {
        [Op.gte]: moment().add(7, "hours"),
      },
    },
  });
  if (requestDB) {
    return requestDB.dataValues;
  } else null;
};
const implementPromo = (promo, listCart) => {
  let total = 0;
  listCart.map((item) => {
    total += item.dataValues.total;
  });
  let totalPromo = 0;
  if (promo.type == "discount" && promo.category == "Percent") {
    totalPromo = (total * promo.price) / 100;
  } else {
    if (Number(promo.price) > total) totalPromo = total;
    else totalPromo = promo.price;
  }
  const productDiscount = {
    id: uuidv5(),
    productId: promo.id,
    qty: 1,
    img: "https://api.comika.media/uploads/comika/icons/discount.png",
    note: null,
    type: promo.type,
    category: promo.category,
    name: `[DISCOUNT] ${promo.name}`,
    weight: 0,
    price: -totalPromo,
    priceRp: "-" + setRupiah(totalPromo),
    total: -totalPromo,
    totalRp: "-" + setRupiah(totalPromo),
  };
  return productDiscount;
};
module.exports = { getPromoByCode, implementPromo };

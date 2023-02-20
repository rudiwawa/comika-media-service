"use strict";
const { Model, Sequelize } = require("sequelize");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class CartTemp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CartTemp, Product }) {
      CartTemp.belongsTo(Product);
      CartTemp.addScope("summary", {
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("qty")), "qty"],
          [Sequelize.fn("sum", Sequelize.literal("Product.capacity * CartTemp.qty")), "weight"],
          [Sequelize.fn("sum", Sequelize.literal("CartTemp.qty * Product.price")), "subtotal"],
        ],
        include: { model: Product, attributes: [] },
      });
      CartTemp.addScope("cart", {
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "ProductId", "userId"],
          include: [
            [Sequelize.col("Product.name"), "name"],
            [Sequelize.literal("Product.capacity * CartTemp.qty"), "weight"],
            [Sequelize.literal("Product.price"), "price"],
            [Sequelize.literal("CONCAT('Rp ',FORMAT(Product.price,0))"), "priceRp"],
            [Sequelize.literal("CartTemp.qty * Product.price"), "total"],
            [Sequelize.literal("CONCAT('Rp ',FORMAT(CartTemp.qty * Product.price,0))"), "totalRp"],
          ],
        },
        include: { model: Product, attributes: [] },
      });
    }
  }
  CartTemp.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: DataTypes.UUID,
      userId: DataTypes.UUID,
      qty: DataTypes.TINYINT,
      img: DataTypes.STRING,
      note: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM(["product", "subscription", "ongkir", "discount"]),
        defaultValue: "product",
      },
    },
    {
      sequelize,
      modelName: "CartTemp",
      tableName: "store_cart_temp",
    }
  );
  return CartTemp;
};

"use strict";
const { Model, Sequelize } = require("sequelize");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart, StoreTransaction, Product }) {
      Cart.belongsTo(Product);
      Cart.belongsTo(StoreTransaction);
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: DataTypes.UUID,
      userId: DataTypes.UUID,
      name: DataTypes.STRING,
      qty: DataTypes.TINYINT,
      storeTransactionId: DataTypes.UUID,
      img: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      priceRp: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("price"));
        },
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalRp: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("total"));
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "store_cart",
    }
  );
  return Cart;
};

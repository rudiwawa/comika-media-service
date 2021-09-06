"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product, Cart, Address }) {
      Cart.belongsTo(User);
      Product.belongsTo(User);
      // Product.belongsTo(Address);
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      productId: DataTypes.UUID,
      userId: DataTypes.UUID,
      note: DataTypes.TEXT,
      qty: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
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
    }
  );
  return Cart;
};

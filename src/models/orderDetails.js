"use strict";
const { Model, Sequelize } = require("sequelize");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderDetails, Order, Product }) {
      OrderDetails.belongsTo(Order);
      OrderDetails.belongsTo(Product);
    }
  }
  OrderDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      orderId: DataTypes.UUID,
      productId: DataTypes.UUID,
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM(["product", "subscription", "ongkir", "discount"]),
        defaultValue: "subscription",
      },
      quantity: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      img: DataTypes.STRING,
      price: DataTypes.INTEGER,
      priceRp: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("price"));
        },
      },
      total: DataTypes.INTEGER,
      totalRp: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("total"));
        },
      },
      // note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetails",
    }
  );
  return OrderDetails;
};

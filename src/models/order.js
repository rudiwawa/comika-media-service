"use strict";
const { Model, Sequelize } = require("sequelize");
const { setRupiah } = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order, OrderDetails, OrderDelivery }) {
      Order.hasMany(OrderDetails, { as: "details" });
      Order.hasOne(OrderDelivery);
      Order.belongsTo(User);
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(["subscription", "store"]),
        defaultValue: "subscription",
      },
      code: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      price: DataTypes.INTEGER,
      priceRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return setRupiah(this.getDataValue("price"));
        },
      },
      token: DataTypes.UUID,
      url: DataTypes.STRING,
      status: { type: DataTypes.STRING(30), defaultValue: "pending" },
      paymentType: DataTypes.STRING(30),
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order, Package }) {
      Order.belongsTo(User);
      Order.belongsTo(Package);
    }
  }
  Order.init(
    {
      id: { type: DataTypes.STRING(30), primaryKey: true },
      plan: DataTypes.STRING(30),
      price: DataTypes.INTEGER,
      token: DataTypes.UUID,
      url: DataTypes.STRING,
      longTime: DataTypes.SMALLINT,
      status: { type: DataTypes.STRING(30), defaultValue: "pending" },
      paymentType: DataTypes.STRING(30),
      userId: DataTypes.UUID,
      packageId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "subscription_orders",
    }
  );
  return Order;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order, Transaction }) {
      Order.belongsTo(User);
      Order.hasMany(Transaction);
    }
  }
  Order.init(
    {
      id: { type: DataTypes.STRING(30), primaryKey: true },
      plan: DataTypes.ENUM(["WEEKLY", "MONTHLY", "YEARLY"]),
      price: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      url: DataTypes.STRING,
      status: { type: DataTypes.ENUM(["pending", "success", "expired"]), defaultValue: "pending" },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

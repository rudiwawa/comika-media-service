"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, Order }) {
      Transaction.belongsTo(Order);
    }
  }
  Transaction.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      trId: DataTypes.UUID,
      status: DataTypes.STRING("20"),
      code: DataTypes.STRING(4),
      paymentType: DataTypes.STRING(30),
      orderId: DataTypes.STRING(30),
      grossAmount: DataTypes.INTEGER,
      currency: DataTypes.STRING(10),
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

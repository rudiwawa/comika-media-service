"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Payment }) {
      Payment.belongsTo(User);
    }
  }
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      orderId: DataTypes.STRING(30),
      userId: DataTypes.UUID,
      package: DataTypes.ENUM(["WEEKLY", "MONTHLY", "YEARLY"]),
      price: DataTypes.STRING(10),
      status: DataTypes.ENUM(["request", "paid"]),
      token: DataTypes.STRING,
      redirectUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};

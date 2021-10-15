"use strict";
const { Model, Sequelize } = require("sequelize");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class OrderDelivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderDelivery, Order }) {
      OrderDelivery.belongsTo(Order, { as: "storeDetails", foreignKey: "orderId" });
      // define association here
    }
  }
  OrderDelivery.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      orderId: DataTypes.UUID,
      addressId: DataTypes.UUID,
      name: DataTypes.STRING(100),
      address: DataTypes.STRING,
      province: DataTypes.STRING(50),
      city: DataTypes.STRING(50),
      subdistrict: {
        type: DataTypes.STRING(50),
      },
      postalCode: DataTypes.STRING(5),
      phone: DataTypes.STRING(13),
      mark: {
        type: DataTypes.STRING(50),
        defaultValue: "rumah",
      },
      weight: DataTypes.SMALLINT,
      courier: DataTypes.STRING(10),
      qty: DataTypes.TINYINT,
      subtotal: DataTypes.INTEGER,
      subtotalRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("subtotal"));
        },
      },
      delivery: DataTypes.INTEGER,
      deliveryRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("delivery"));
        },
      },
      total: {
        type: DataTypes.INTEGER,
      },
      totalRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("total"));
        },
      },
    },
    {
      sequelize,
      modelName: "OrderDelivery",
    }
  );
  return OrderDelivery;
};

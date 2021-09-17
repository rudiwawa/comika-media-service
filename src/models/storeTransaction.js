"use strict";
const { Model, Sequelize } = require("sequelize");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class StoreTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Address, StoreTransaction, User, Cart }) {
      StoreTransaction.belongsTo(User);
      StoreTransaction.belongsTo(Address);
      StoreTransaction.hasMany(Cart);
    }
  }
  StoreTransaction.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      code: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.UUID,
      addressId: DataTypes.UUID,
      name: DataTypes.STRING(100),
      address: DataTypes.STRING,
      province: DataTypes.STRING(50),
      city: DataTypes.STRING(50),
      subdistrict: DataTypes.STRING(50),
      postalCode: DataTypes.STRING(5),
      phone: DataTypes.STRING(13),
      mark: {
        type: DataTypes.ENUM(["rumah", "kantor"]),
        defaultValue: "rumah",
      },
      weight: DataTypes.SMALLINT,
      courier: DataTypes.STRING(10),
      items: DataTypes.TINYINT,
      delivery: DataTypes.INTEGER,
      deliveryRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("delivery"));
        },
      },
      total: DataTypes.INTEGER,
      totalRp: {
        type: DataTypes.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("total"));
        },
      },
      status: {
        type: DataTypes.ENUM(["pending", "success", "expired"]),
      },
    },
    {
      sequelize,
      modelName: "StoreTransaction",
    }
  );
  return StoreTransaction;
};

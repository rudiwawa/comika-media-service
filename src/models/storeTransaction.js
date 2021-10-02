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
      userId: {
        type: DataTypes.UUID,
      },
      addressId: DataTypes.UUID,
      name: DataTypes.STRING(100),
      address: DataTypes.STRING,
      province: DataTypes.STRING(50),
      city: DataTypes.STRING(50),
      subdistrict: {
        type: DataTypes.STRING(50),
        set(val) {
          const timestamp = "" + Date.now();
          const courier = (this.getDataValue("courier") + "COMIKAMEDIA").replace(/[ \a\i\u\o\e]/gi, "");
          const subdistrict = val.replace(/[ \a\i\u\o\e]/gi, "").toUpperCase();
          const code = courier + timestamp.substr(0, 7) + subdistrict + timestamp.substr(7);
          this.setDataValue("code", code);
          this.setDataValue("subdistrict", val);
        },
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
      status: {
        type: DataTypes.ENUM(["pending", "success", "expired"]),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "StoreTransaction",
    }
  );
  return StoreTransaction;
};

"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      code: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.TEXT,
      capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dateFrom: {
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm"),
      },
      dateTo: {
        type: DataTypes.DATE,
        defaultValue: moment().add(1, "months").format("YYYY-MM-DD HH:mm"),
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm"),
      },
      type: {
        type: DataTypes.ENUM("percent", "nominal"),
        defaultValue: "nominal",
      },
      discount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        set(value) {
          if (value <= 100) {
            this.setDataValue("discount", value / 100);
          }
        },
        get() {
          const discount = this.getDataValue("discount");
          return discount <= 1 ? discount * 100 : discount;
        },
      },
    },
    {
      sequelize,
      modelName: "Promo",
    }
  );
  return Promo;
};

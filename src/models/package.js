"use strict";
const {
  Model,
  Sequelize,
  Sequelize: { Op },
} = require("sequelize");
const currency = require("../helpers/currency");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Package }) {
      Package.addScope("public", {
        where: {
          publishedAt: {
            [Op.lte]: moment().add(7, "hours"),
          },
          availableTo: {
            [Op.gte]: moment().add(7, "hours"),
          },
        },
      });
    }
  }
  Package.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      code: DataTypes.STRING(10),
      name: DataTypes.STRING(30),
      price: { type: DataTypes.INTEGER, defaultValue: 0 },
      rupiah: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("price"));
        },
      },
      longTime: DataTypes.SMALLINT,
      description: DataTypes.STRING,
      publishedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      availableTo: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};

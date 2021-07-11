"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Package.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING(30),
      price: DataTypes.INTEGER,
      longTime: DataTypes.SMALLINT,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};

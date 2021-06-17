"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jumbotron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jumbotron.init(
    {
      img: DataTypes.STRING,
      sequence: { type: DataTypes.TINYINT, defaultValue: 0 },
      link: DataTypes.STRING,
      isPhone: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isDesktop: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Jumbotron",
    }
  );
  return Jumbotron;
};

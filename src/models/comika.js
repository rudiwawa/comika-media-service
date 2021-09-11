"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comika extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comika, Article }) {
      Comika.hasMany(Article);
    }
  }
  Comika.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          if (!this.getDataValue("photo")) return "https://pbs.twimg.com/profile_images/1322809384531980289/N15e05wn_400x400.jpg";
          return this.getDataValue("photo");
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comika",
    }
  );
  return Comika;
};

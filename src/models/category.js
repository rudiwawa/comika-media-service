"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Product }) {
      // Category.hasMany(Product);
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(20),
      type: {
        type: DataTypes.ENUM(["physical", "electronic", "redirect"]),
        defaultValue: "physical",
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "store_categories",
    }
  );
  return Category;
};

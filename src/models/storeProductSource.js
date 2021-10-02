"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoreProductSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StoreProductSource, Product, Source }) {
      StoreProductSource.belongsTo(Product);
      StoreProductSource.belongsTo(Source, { as: "source" });
    }
  }
  StoreProductSource.init(
    {
      productId: { type: DataTypes.UUID, primaryKey: true },
      sourceId: { type: DataTypes.UUID, primaryKey: true },
      thumbnail: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      paranoid: false,
      modelName: "StoreProductSource",
    }
  );
  return StoreProductSource;
};

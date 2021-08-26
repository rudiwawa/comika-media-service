"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class storeSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductToSource, Product, Source }) {
      // ProductToSource.belongsTo(Product);
      // ProductToSource.belongsTo(Source);
    }
  }
  storeSource.init(
    {
      productId: { type: DataTypes.UUID, primaryKey: true },
      sourceId: { type: DataTypes.UUID, primaryKey: true },
    },
    {
      sequelize,
      paranoid: false,
      modelName: "StoreProductSource",
    }
  );
  return storeSource;
};

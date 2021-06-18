"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Share, Article }) {
      Share.belongsTo(Article);
    }
  }
  Share.init(
    {
      articleId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Share",
    }
  );
  return Share;
};

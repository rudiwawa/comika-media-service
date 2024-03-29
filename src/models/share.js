"use strict";
const { Model, Sequelize } = require("sequelize");
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
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      articleId: DataTypes.UUID,
      userId: DataTypes.UUID,
      shareTo: {
        type: DataTypes.ENUM(["WA", "FB", "LINE", "TWITTER", "LINK"]),
        defaultValue: "LINK",
      },
    },
    {
      sequelize,
      modelName: "Share",
    }
  );
  return Share;
};

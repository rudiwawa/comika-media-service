"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bookmark, User, Article }) {
      Bookmark.belongsTo(User);
      Bookmark.belongsTo(Article);
    }
  }
  Bookmark.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      articleId: {
        type: DataTypes.UUID,
        references: {
          model: "Article",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};

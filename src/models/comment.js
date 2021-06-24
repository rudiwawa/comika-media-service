"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, User, Comment }) {
      Comment.belongsTo(Article);
      Comment.belongsTo(User);
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      comment: DataTypes.STRING,
      userId: DataTypes.UUID,
      articleId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, User, Comment }) {
      // define association here
      Article.belongsTo(User);
      Article.hasMany(Comment);
      Article.belongsToMany(User, { through: "likes" });
    }
  }
  Article.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      title: DataTypes.STRING,
      banner: DataTypes.STRING,
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};

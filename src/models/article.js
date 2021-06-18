"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, User, Comment, Visitor, Share }) {
      // define association here
      Article.belongsTo(User);
      Article.hasMany(Comment);
      Article.hasMany(Visitor);
      Article.hasMany(Share);
      Article.belongsToMany(User, { through: "likes" });
      Article.addScope("public", {
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*) FROM visitors
                WHERE article_id = Article.id
                )`),
              "viewer",
            ],
            [
              sequelize.literal(`(
                SELECT COUNT(*) FROM shares
                WHERE article_id = Article.id
                )`),
              "shared",
            ],
          ],
        },
        where: {
          isPublish: true,
        },
      });
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
      isPublish: {
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

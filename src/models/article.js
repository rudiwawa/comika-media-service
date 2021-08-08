"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, User, Comment, Visitor, Share, Comika, Bookmark }) {
      // define association here
      Article.belongsTo(User);
      Article.belongsTo(Comika);
      Article.hasMany(Comment);
      Article.hasMany(Visitor);
      Article.hasMany(Share);
      Article.hasMany(Bookmark);
      Article.belongsToMany(User, { through: "likes" });
      Article.addScope("public", {
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*) FROM visitors
                WHERE article_id = "Article"."id"
                )`),
              "viewer",
            ],
            [
              sequelize.literal(`(
                SELECT COUNT(*) FROM shares
                WHERE article_id = "Article"."id"
                )`),
              "shared",
            ],
          ],
        },
        include: {
          model: Comika,
          attributes: ["id", "name", "photo", "verified"],
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
      comikaId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        unique: true,
        set(value) {
          const slug = value.replace(/[^a-zA-Z0-9]/gi, "-");
          this.setDataValue("slug", slug);
          this.setDataValue("title", value);
        },
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
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

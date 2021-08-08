"use strict";
const { Model, Sequelize } = require("sequelize");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, ResetPassword, Article, Subscription, Bookmark }) {
      User.addScope("admin", {
        where: {
          [Sequelize.Op.or]: [{ role: "admin" }, { role: "writer" }],
        },
      });
      User.hasMany(Subscription);
      User.hasMany(Article);
      User.hasMany(ResetPassword);
      User.belongsToMany(Article, { through: "likes" });
      User.hasMany(Bookmark);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: DataTypes.STRING,
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          if (!this.getDataValue("photo")) return "https://www.comikacomedy.club/wp-content/uploads/2020/06/image1.png";
          return this.getDataValue("photo");
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", hashSync(value, genSaltSync(10)));
        },
      },
      role: {
        type: DataTypes.ENUM(["admin", "writer", "user"]),
        defaultValue: "user",
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};

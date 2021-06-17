"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JWT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ JWT, User }) {
      JWT.belongsTo(User);
    }
  }
  JWT.init(
    {
      userId: DataTypes.UUID,
      token: DataTypes.TEXT,
      revoke: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "JWT",
      tableName: "jwt",
    }
  );
  return JWT;
};

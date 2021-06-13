"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      Role.belongsTo(User);
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM(["admin", "writer", "user"]),
        defaultValue: "user",
      },
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );
  return Role;
};

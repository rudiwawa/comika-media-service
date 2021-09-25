"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Subscription }) {
      Subscription.belongsTo(User);
    }
  }
  Subscription.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      availableOn: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName:"subscription_list"
    }
  );
  return Subscription;
};

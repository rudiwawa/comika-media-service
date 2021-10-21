"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Notification, User }) {
      Notification.belongsTo(User);
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: DataTypes.STRING,
      img: DataTypes.STRING,
      description: DataTypes.TEXT,
      descriptionHtml: DataTypes.TEXT,
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};

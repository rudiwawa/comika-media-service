"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Notification, User, Order }) {
      Notification.belongsTo(User);
      Notification.belongsTo(Order);
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
      type: {
        type: DataTypes.ENUM(["transaksi", "promo", "informasi"]),
        defaultValue: "transaksi",
      },
      typeIcon: {
        type: DataTypes.VIRTUAL,
        get() {
          switch (this.getDataValue("type")) {
            case "promo":
              return "https://api.comika.media/uploads/comika/promo.png";
            case "informasi":
            default:
              return "https://api.comika.media/uploads/comika/informasi.png";
          }
        },
      },
      userId: DataTypes.UUID,
      orderId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};

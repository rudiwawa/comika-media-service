'use strict';
const { Model, Sequelize } = require('sequelize');
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
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        set(val) {
          this.setDataValue('link', val);
        },
        get() {
          const link = this.getDataValue('link');
          if (link) {
            return link;
          }
          return `https://comika.media/notification/${this.id}`;
        },
      },
      type: {
        type: DataTypes.ENUM(['transaksi', 'promo', 'informasi']),
        defaultValue: 'transaksi',
      },
      userId: {
        type: DataTypes.UUID,
      },
      orderId: DataTypes.UUID,
      typeIcon: {
        type: DataTypes.VIRTUAL,
        get() {
          switch (this.getDataValue('type')) {
            case 'promo':
              return 'https://api.comika.media/uploads/comika/icons/promo.png';
            case 'transaksi':
              return 'https://api.comika.media/uploads/comika/icons/transaksi.png';
            case 'informasi':
            default:
              return 'https://api.comika.media/uploads/comika/icons/informasi.png';
          }
        },
      },
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};

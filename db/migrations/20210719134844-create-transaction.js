"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactions", {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      trId: Sequelize.UUID,
      status: Sequelize.STRING("20"),
      code: Sequelize.STRING(4),
      paymentType: Sequelize.STRING(30),
      orderId: Sequelize.STRING(30),
      grossAmount: Sequelize.INTEGER,
      currency: Sequelize.STRING(10),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transactions");
  },
};

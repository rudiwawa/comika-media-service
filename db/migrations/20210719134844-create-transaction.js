'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      tr_id: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      paymentType: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.STRING
      },
      grossAmount: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
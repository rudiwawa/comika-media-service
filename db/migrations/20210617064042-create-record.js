"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("records", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      status: Sequelize.STRING(3),
      method: Sequelize.STRING(10),
      payload: Sequelize.JSON,
      url: Sequelize.STRING,
      msg: Sequelize.TEXT,
      userId: Sequelize.UUID,
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
    await queryInterface.dropTable("Records");
  },
};

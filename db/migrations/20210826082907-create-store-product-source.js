"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("store_product_sources", {
      productId: { type: Sequelize.UUID, primaryKey: true },
      sourceId: { type: Sequelize.UUID, primaryKey: true },
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
    await queryInterface.dropTable("storeSources");
  },
};

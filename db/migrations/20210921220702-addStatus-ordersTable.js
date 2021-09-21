"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("orders", "status", {
        type: Sequelize.ENUM(["pending", "success", "expired"]),
        after: "price",
        defaultValue: "pending",
      }),
      queryInterface.addColumn("orders", "url", {
        type: Sequelize.STRING,
        after: "price",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("orders", "status"), queryInterface.removeColumn("orders", "url")]);
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("store_cart", "weight", {
        type: Sequelize.DataTypes.INTEGER,
        after: "img",
      }),
      queryInterface.addColumn("store_cart_temp", "weight", {
        type: Sequelize.DataTypes.INTEGER,
        after: "img",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("store_cart", "weight"),
      queryInterface.removeColumn("store_cart_temp", "weight"),
    ]);
  },
};

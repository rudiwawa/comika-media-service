"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("store_products", "weight", {
        type: Sequelize.DataTypes.SMALLINT,
        after: "description",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("store_products", "weight")]);
  },
};

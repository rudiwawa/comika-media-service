"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("addresses", "active", {
        type: Sequelize.DataTypes.BOOLEAN,
        default: false,
        after: "mark",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("addresses", "active")]);
  },
};

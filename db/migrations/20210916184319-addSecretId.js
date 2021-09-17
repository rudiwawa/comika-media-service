"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "secret_id", {
        type: Sequelize.DataTypes.STRING,
        after: "password",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("users", "secret_id")]);
  },
};

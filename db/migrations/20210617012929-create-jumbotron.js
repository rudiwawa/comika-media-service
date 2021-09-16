"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("jumbotrons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      img: Sequelize.STRING,
      sequence: { type: Sequelize.SMALLINT, defaultValue: 0 },
      link: Sequelize.STRING,
      isPhone: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isDesktop: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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
    await queryInterface.dropTable("Jumbotrons");
  },
};

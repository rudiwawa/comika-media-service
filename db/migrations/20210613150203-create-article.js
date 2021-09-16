"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("articles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: Sequelize.UUID,
      comikaId: Sequelize.INTEGER,
      title: {
        type: Sequelize.STRING,
        unique: true,
      },
      slug: {
        unique: true,
        type: Sequelize.STRING,
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      banner: Sequelize.STRING,
      isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isPublish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      attribution: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      content: Sequelize.TEXT,
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
    await queryInterface.dropTable("Articles");
  },
};

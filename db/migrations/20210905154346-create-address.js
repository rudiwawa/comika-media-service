"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: Sequelize.UUID,
      name: Sequelize.STRING(100),
      address: Sequelize.STRING,
      province_id: Sequelize.SMALLINT,
      province: Sequelize.STRING(50),
      city_id: Sequelize.SMALLINT,
      city: Sequelize.STRING(50),
      subdistrict_id: Sequelize.SMALLINT,
      subdistrict: Sequelize.STRING(50),
      type: Sequelize.STRING(10),
      postalCode: Sequelize.STRING(5),
      phone: Sequelize.STRING(13),
      mark: {
        type: Sequelize.ENUM(["rumah", "kantor"]),
        defaultValue: "rumah",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Addresses");
  },
};

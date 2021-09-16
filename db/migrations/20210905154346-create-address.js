"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: Sequelize.UUID,
      name: Sequelize.STRING(100),
      address: Sequelize.STRING,
      provinceId: Sequelize.SMALLINT,
      province: Sequelize.STRING(50),
      cityId: Sequelize.SMALLINT,
      city: Sequelize.STRING(50),
      subdistrictId: Sequelize.SMALLINT,
      subdistrict: Sequelize.STRING(50),
      type: Sequelize.STRING(10),
      postalCode: Sequelize.STRING(5),
      phone: Sequelize.STRING(13),
      mark: {
        type: Sequelize.ENUM(["rumah", "kantor"]),
        defaultValue: "rumah",
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
    await queryInterface.dropTable("Addresses");
  },
};

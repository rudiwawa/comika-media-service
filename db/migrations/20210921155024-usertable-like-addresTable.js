"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "district", "subdistrict");
    return Promise.all([
      queryInterface.addColumn("users", "province_id", {
        type: Sequelize.DataTypes.SMALLINT,
        after: "province",
      }),
      queryInterface.addColumn("users", "city_id", {
        type: Sequelize.DataTypes.SMALLINT,
        after: "city",
      }),
      queryInterface.addColumn("users", "subdistrict_id", {
        type: Sequelize.DataTypes.SMALLINT,
        after: "subdistrict",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("users", "subdistrict", "district"),
      queryInterface.removeColumn("users", "provinceId"),
      queryInterface.removeColumn("users", "cityId"),
      queryInterface.removeColumn("users", "subdistrictId"),
    ]);
  },
};

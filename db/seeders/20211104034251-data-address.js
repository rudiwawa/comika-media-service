"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
          user_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
          name: "BIGIO MALANG",
          address: "GRIYASHANTA EKSEKUTIF P360",
          province_id: 11,
          province: "Jawa Timur",
          city_id: 256,
          city: "Malang",
          subdistrict_id: 3637,
          subdistrict: "Lowokwaru",
          type: "kota",
          postal_code: "68172",
          phone: "082164028264",
          mark: "kantor",
          active: 1,
          created_at: moment().format("YYYY-MM-DD"),
          updated_at: moment().format("YYYY-MM-DD"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

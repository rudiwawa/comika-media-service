"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "promos",
      [
        {
          id: 1,
          name: "Promo November 11/11",
          code: "COMIKA11",
          capacity: 9,
          date_from: moment().format("YYYY-MM-DD"),
          date_to: moment().add(5, "days").format("YYYY-MM-DD"),
          is_available: true,
          published_at: moment().format("YYYY-MM-DD"),
          type: "percent",
          discount: 0.1,
          created_at: moment().format("YYYY-MM-DD"),
          updated_at: moment().format("YYYY-MM-DD"),
        },
        {
          id: 2,
          name: "Promo Akhir Tahun 12/12",
          code: "AKHIRTAHUN",
          capacity: 9,
          date_from: moment().format("YYYY-MM-DD"),
          date_to: moment().add(5, "days").format("YYYY-MM-DD"),
          is_available: true,
          published_at: moment().format("YYYY-MM-DD"),
          type: "nominal",
          discount: 30000,
          created_at: moment().format("YYYY-MM-DD"),
          updated_at: moment().format("YYYY-MM-DD"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("promos", null, {});
  },
};

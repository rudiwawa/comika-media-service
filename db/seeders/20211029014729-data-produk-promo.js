"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "0734f6b2-6b4c-45b9-be8c-a1aaf6903374",
          name: "Promo November 11/11",
          description: "deskripsi promo november",
          slug: "COMIKA11",
          type: "discount",
          category: "Percent",
          capacity: 9999,
          price: 10,
          sequence: 0,
          is_publish: true,
          published_at: moment().format("YYYY-MM-DD hh:mm"),
          available_to: moment().add(5, "days").format("YYYY-MM-DD hh:mm"),
          created_at: moment().format("YYYY-MM-DD"),
          updated_at: moment().format("YYYY-MM-DD"),
        },
        {
          id: "0734f6b2-6b4c-45b9-be8c-b1aaf6903375",
          name: "Promo Akhir Tahun 12/12",
          slug: "AKHIRTAHUN",
          description: "deskripsi promo akhir tahun",
          slug: "AKHIRTAHUN",
          type: "discount",
          category: "Nominal",
          capacity: 9999,
          price: 40000,
          sequence: 0,
          is_publish: true,
          published_at: moment().format("YYYY-MM-DD hh:mm"),
          available_to: moment().add(5, "days").format("YYYY-MM-DD hh:mm"),
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

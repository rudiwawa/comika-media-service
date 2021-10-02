"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [
      {
        id: "3d4d4d47-a2f3-48a7-a3b2-0a2e910038e5",
        name: "Mingguan/Surat Kabar",
        price: 20000,
        capacity: 7,
        type: "subscription",
        description: `Konten eksklusif yang tidak ada di versi gratis~Baca artikel tanpa terpotong selama seminggu`,
        is_publish: true,
        sequence: 1,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "3d4d4d47-a2f3-49a7-a3b2-0a2e910038e5",
        name: "Bulanan/Tabloid",
        type: "subscription",
        price: 50000,
        capacity: 30,
        description: `Konten eksklusif yang tidak ada di versi gratis~Baca artikel tanpa terpotong selama sebulan`,
        is_publish: true,
        sequence: 2,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "3d4d4d47-a2f3-48a7-a3c2-0a2e910038e5",
        name: "Tahunan/Antologi",
        type: "subscription",
        price: 500000,
        capacity: 365,
        description: `Konten eksklusif yang tidak ada di versi gratis~Baca artikel tanpa terpotong selama setahun`,
        is_publish: true,
        sequence: 3,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", {
      type: "subscription",
    });
  },
};

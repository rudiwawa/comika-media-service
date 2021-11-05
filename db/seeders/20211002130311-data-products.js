"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("products", [
    //   {
    //     id: "3d4d4d47-a2f3-48a7-a3b2-0a2e910038e5",
    //     name: "Mingguan",
    //     slug: "mingguan",
    //     price: 20000,
    //     capacity: 7,
    //     type: "subscription",
    //     description: "1 konten tubruk~1 konten Premis Emas~1 konten Cerita Berkomedi~7 konten eksklusif harian",
    //     is_publish: true,
    //     published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     available_to: moment().add(5, "years").format("YYYY-MM-DD HH:mm:ss"),
    //     created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   },
    //   {
    //     id: "3d4d4d47-a2f3-49a7-a3b2-0a2e910038e5",
    //     name: "Bulanan",
    //     slug: "bulanan",
    //     price: 50000,
    //     capacity: 30,
    //     type: "subscription",
    //     description: "4 konten Tubruk~4 konten Premis Emas~4 konten Cerita Berkomedi~30 konten eksklusif harian",
    //     is_publish: true,
    //     published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     available_to: moment().add(5, "years").format("YYYY-MM-DD HH:mm:ss"),
    //     created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   },
    //   {
    //     id: "3d4d4d47-a2f3-48a7-a3c2-0a2e910038e5",
    //     name: "Tahunan",
    //     slug: "tahunan",
    //     price: 500000,
    //     capacity: 365,
    //     type: "subscription",
    //     description:
    //       "52 konten Tubruk~52 konten Premis Emas~52 konten Cerita Berkomedi~365 konten eksklusif harian~Coupon senilai Rp500.000 dari Comika Event, ComikaID, FISIKKAL, dan Pecahkan",
    //     is_publish: true,
    //     published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     available_to: moment().add(5, "years").format("YYYY-MM-DD HH:mm:ss"),
    //     created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", {
      type: "subscription",
    });
  },
};

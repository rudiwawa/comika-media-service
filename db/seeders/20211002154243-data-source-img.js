"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("sources", [
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
        url: "https://comika.id/wp-content/uploads/2021/09/cover-katiarsis-300x300.jpg",
        name: "Katiarsis",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
        url: "https://comika.id/wp-content/uploads/2021/08/poster-kelana-dd-300x300.jpg",
        name: "Kelana",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
        url: "https://comika.id/wp-content/uploads/2021/08/poster-mr-gamael-300x300.png",
        name: "Daftar Polisi",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
        url: "https://comika.id/wp-content/uploads/2021/06/cover-ayah-ikhlas-1-300x300.png",
        name: "Ayah Ikhlas",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sources", null, {});
  },
};

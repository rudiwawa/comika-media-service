"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("sources", [
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
        url: "https://api.comika.media/uploads/comika/icon.png",
        name: "Katiarsis",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
        url: "https://api.comika.media/uploads/comika/icon.png",
        name: "Kelana",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
        url: "https://api.comika.media/uploads/comika/icon.png",
        name: "Daftar Polisi",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
        url: "https://api.comika.media/uploads/comika/icon.png",
        name: "Ayah Ikhlas",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6823351",
        url: "https://api.comika.media/uploads/comika/icon.png",
        name: "subscription",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sources", null, {});
  },
};

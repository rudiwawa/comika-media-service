"use strict";
const moment = require("moment");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
        name: "Ghany Abdillah Ersa",
        email: "ghanyersa24@gmail.com",
        role: "admin",
        password: hashSync("comika-media", genSaltSync(10)),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
        name: "Danang TP",
        email: "danang.tp@gmail.com",
        role: "admin",
        password: hashSync("comika-media", genSaltSync(10)),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
        name: "Ridwan Fajar",
        email: "rdwn@gmail.com",
        role: "writer",
        password: hashSync("comika-media", genSaltSync(10)),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null);
  },
};

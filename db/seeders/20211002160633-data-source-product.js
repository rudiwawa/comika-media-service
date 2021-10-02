"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "store_product_sources",
      [
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
          thumbnail: true,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
          thumbnail: true,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803352",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803352",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803348",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803352",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803349",
          thumbnail: true,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803353",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          product_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803353",
          source_id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
          thumbnail: true,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
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

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("jumbotrons", [
      {
        id: 1,
        sequence: 1,
        link: "",
        is_phone: true,
        is_desktop: true,
        img: "uploads/article/1623908344375-720351306 - Screen Shot 2021-06-13 at 11.39.14.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        sequence: 2,
        link: "https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens",
        is_phone: true,
        is_desktop: true,
        img: "uploads/article/1623908344375-720351306 - Screen Shot 2021-06-13 at 11.39.14.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("jumbotrons", null, {});
  },
};

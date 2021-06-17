"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: "b253d5fd-8f59-4ab8-9e72-f515f9b91303",
        name: "Ghany Abdillah Ersa",
        email: "ghanyersa24@gmail.com",
        password:
          "$2b$10$LWwDBsHfWKpb2j1Xp511B.RrW93umdZ407aqEV3H8dVdnaRi6OING",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("users", null, {});
  },
};

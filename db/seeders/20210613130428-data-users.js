"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: "803385f2-8ce3-45c1-8f0b-bcefe0176152",
        name: "Shinichi Kudo",
        email: "kudo@gmail.com",
        password:
          "$2b$10$IL6EfwCmMXdOiqj5IgGXgeU3SsGKZ.Uw/D7rj4org5fu2HxDgBVEW",
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
        id: "accc67f9-dcd3-49b1-9c4a-0d197841b5ae",
        name: "Ghany Abdillah Ersa",
        email: "ghanyersa24@gmail.com",
        password:
          "$2b$10$d9wa231UYIOwBkU8QhRV4ul6Z2AC/bub9kVD6TWBcPjQdvzydthAO",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("users", null, {});
  },
};

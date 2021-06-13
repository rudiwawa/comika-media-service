"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: "55c4f970-cf4c-4800-937e-940e62fb64e1",
        user_id: "803385f2-8ce3-45c1-8f0b-bcefe0176152",
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6dad9dd7-028d-4122-9db3-00122d31093c",
        user_id: "accc67f9-dcd3-49b1-9c4a-0d197841b5ae",
        role: "writer",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};

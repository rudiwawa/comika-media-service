"use strict";

const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("packages", [
      {
        id: "3d4d4d47-a2f3-48a7-a3b2-0a2e910038e5",
        name: "Mingguan/Surat Kabar",
        code: "MSK",
        price: 20000,
        long_time: 7,
        description: `<ul> 
                            <li>Konten eksklusif yang tidak ada di versi gratis</li> 
                            <li>Baca artikel tanpa terpotong selama seminggu</li> 
                        </ul>`,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "3d4d4d47-a2f3-49a7-a3b2-0a2e910038e5",
        name: "Bulanan/Tabloid",
        code: "BT",
        price: 50000,
        long_time: 30,
        description: `<ul> 
                            <li>Konten eksklusif yang tidak ada di versi gratis</li> 
                            <li>Baca artikel tanpa terpotong selama sebulan</li> 
                        </ul>`,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: "3d4d4d47-a2f3-48a7-a3c2-0a2e910038e5",
        name: "Tahunan/Antologi",
        code: "TA",
        price: 500000,
        long_time: 365,
        description: `<ul> 
                            <li>Konten eksklusif yang tidak ada di versi gratis</li> 
                            <li>Baca artikel tanpa terpotong selama setahun</li> 
                        </ul>`,
        published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        available_to: moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("packages", null);
  },
};

"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert(
    //   "products",
    //   [
    //     {
    //       id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803350",
    //       name: "Katarsis",
    //       slug: "katarsis",
    //       price: 60000,
    //       capacity: 300,
    //       type: "product",
    //       category: "Digital Produk",
    //       description: `Perayaan Malam Kesedihan oleh Tiar Nugraha merupakan sebuah pertunjukan Stand-Up Comedy tunggal dari komika asal Pekalongan, Jawa Tengah. Katiarsis sukses dilaksanakan 26 Juni 2021 yang lalu di kota Pekalongan dan menceritakan pengalaman hidup seorang Tiar Nugraha yang cukup menyedihkan. Digital download yang sangat menghibur dan lengkap dengan terjemahan Bahasa Indonesia ini bisa kamu tonton jika kamu ingin menonton komedi gelap khas Tiar.`,
    //       is_publish: true,
    //       published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       available_to: moment().add(1, "years").format("YYYY-MM-DD HH:mm:ss"),
    //       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     },
    //     {
    //       id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803351",
    //       name: "Kelana",
    //       slug: "kelana",
    //       price: 30000,
    //       capacity: 400,
    //       type: "product",
    //       category: "Digital Produk",
    //       description: `Pertunjukan Stand-Up Comedy Special dari seorang komika asal Pekalongan, Arzaqi Abil. Kelana digelar pada tanggal 29 Mei 2021 ini menceritakan tentang perjalanan hidup seorang Abil yang dibagi menjadi empat babak, yaitu Futuris, Egois, Renjana & Memoar. Dimulai dengan kisahnya mengikuti audisi SUCI IX hingga patah hati pertamanya yang dibalut dalam komedi ala Abil. Buat kamu yang penasaran keseruan serta kelucuan dari Abil, mari dibeli digital download ini!.`,
    //       is_publish: true,
    //       published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       available_to: moment().add(1, "years").format("YYYY-MM-DD HH:mm:ss"),
    //       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     },
    //     {
    //       id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803352",
    //       name: "Daftar Polisi",
    //       slug: "daftar-polisi",
    //       price: 20000,
    //       capacity: 400,
    //       type: "product",
    //       category: "Merchandise",
    //       description: `Sebuah Digital Download dari Stand-Up Comedy Special Show Mr. Gamayel. Dalam digital download yang berdurasi 1 jam 42 menit ini, Mr. Gamayel membagikan pengalamannya saat proses menempuh pendidikan polisi. Tidak hanya itu, berbagai cerita lucu saat pertama kali mendaftar hingga lulus pendidikan ia ceritakan dengan komedi ala Mr. Gamayel yang sangat menghibur. Butuh hiburan ringan dan menyenangkan? Digital download ini cocok untukmu!.`,
    //       is_publish: true,
    //       published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       available_to: moment().add(1, "years").format("YYYY-MM-DD HH:mm:ss"),
    //       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     },
    //     {
    //       id: "0734f6b2-6b4c-45b9-be8c-d1aaf6803353",
    //       name: "Ayah Ikhlas",
    //       slug: "ayah-ikhlas",
    //       price: 70000,
    //       capacity: 700,
    //       type: "product",
    //       category: "Merchandise",
    //       description: `Digital Download Ayah Ikhlas merupakan sebuah Stand-Up Comedy Special dari komika betawi kita, David Nurbianto. Disini David menceritakan seluruh perjalanan dan curahan hati seputar rumah tangganya. Tidak hanya cerita mengenai hidupnya setelah menjadi Ayah Ikhlas, namun juga pengalamannya jauh sebelum menjadi seorang Ayah. David berhasil memecah tawa tiap penontonnya dan mengakhiri pertunjukannya dengan isak tangis yang mengharukan. Penasaran versi lengkap perjalanan seorang Ayah Ikhlas? Langsung saja miliki digital download ini!.`,
    //       is_publish: true,
    //       published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       available_to: moment().add(1, "years").format("YYYY-MM-DD HH:mm:ss"),
    //       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     },
    //     {
    //       id: "0734f6b2-6b4c-45b9-be8c-d1aaf6903373",
    //       name: "Ongkir",
    //       slug: "ongkir",
    //       price: 0,
    //       capacity: 1,
    //       type: "ongkir",
    //       category: null,
    //       description: null,
    //       is_publish: false,
    //       published_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       available_to: moment().add(5, "years").format("YYYY-MM-DD HH:mm:ss"),
    //       created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //       updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     }
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", {}, {});
  },
};

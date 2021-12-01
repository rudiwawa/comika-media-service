const generateActivation = require("../controllers/subscription/generateActivation.service");
const sendNotification = require("./sendNotification");

module.exports = async (userId, days) => {
  await generateActivation(userId, days);
  sendNotification.create(
    userId,
    `FREE MEMBERSHIP ${days} DAYS`,
    `Terima kasih atas kepercayaan terhadap Comika Media. silahkan menikmati uji coba akses konten premium comika media selama ${days} hari.`,
    "https://api.comika.media/uploads/comika/settlement.png",
    null,
    "informasi"
  );
};

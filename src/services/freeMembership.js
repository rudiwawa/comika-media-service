const generateActivation = require("../controllers/subscription/generateActivation.service");
const sendNotification = require("./sendNotification");

const messageFree = () => {
  return `
  <p style="text-align: justify;">
    &emsp;&emsp;&emsp;Terima kasih sudah mau mendaftarkan email untuk jadi pembaca Comikamedia! Tenang, kami tidak akan gadaikan email kamu untuk jadi database pinjol. Dengan login, kamu akan dapat banyak keuntungan: mulai dari bisa menumpahkan opini lewat kolom komentar, hingga berbagi artikel di media sosial dengan tambahan emoji api-api. Mau simpan artikel untuk dibaca ketika capek dikirimi stiker jayus di grup WhatsApp juga bisa.
    <br>
    <br>
    &emsp;&emsp;&emsp;Comikamedia sudah resmi menasbihkan diri sebagai media online komedi, yang menggunakan sistem berlangganan. Demi reportase yang lebih mendalam, reporter kami mempertaruhkan kesehatan mata dengan riset berjam-jam dari laptop, membelah jalanan untuk mewartakan fenomena komedi dengan lebih dekat, hingga sok asik kepada komika demi mengorek informasi orang dalam. Kalau kamu cinta komedi, harga berlangganan Comikamedia tak lebih mahal dari beli saham, tapi bisa jadi investasi! Nah, kamu beruntung karena di bulan pertama ini, pembelanjaan produk Comika apapun akan mendapatkan <b>satu bulan gratis akses berlangganan</b>. Semoga suka ya!
    <br>
    <br>
    &emsp;&emsp;&emsp;Akhir kata, direktur kami Pandji Pragiwaksono punya cita-cita: "Comika didirikan agar komika bisa hidup dari karya." Itulah mengapa beliau juga mendirikan Comikamedia, karena reporter kami semua komika. Hanya saja (untuk saat ini) kami lebih jago mewartakan komedi ketimbang berkomedinya.
  </p>
Cheers,
<br>
Redaksi Comikamedia
`;
};

module.exports = async (userId, days) => {
  await generateActivation(userId, days);
  sendNotification.create(
    userId,
    `FREE MEMBERSHIP ${days} DAYS`,
    messageFree(),
    "https://api.comika.media/uploads/comika/membership.png",
    null,
    "informasi"
  );
};

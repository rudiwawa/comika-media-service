const { Register, User, sequelize } = require("../../models");
const sendEmail = require("../../services/sendEmail");
const jwt = require("jsonwebtoken");
const generateActivation = require("../subscription/generateActivation.service");
const sendNotification = require("../../services/sendNotification");

const service = async function (req, res, next) {
  const token = req.params.token;
  try {
    const decode = jwt.verify(token, "SIGNUP-COMIKA-MEDIA-PRO");
    const requestDB = await Register.findOne({
      where: {
        token,
      },
    });
    if (!requestDB) {
      return res.status(404).json({
        message: "Token not found",
      });
    }
    const { id } = requestDB;
    await Register.destroy({
      where: {
        id,
      },
    });
    await User.update({ isVerified: true }, { where: { id } });
    sendEmail({ to: decode.email, body: bodyWelcoming(decode.name) });
    freeMember(id, 30);
    return res.send(
      `<script>location.replace("https://comika.media/")</script>`
    );
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const freeMember = async (userId, days) => {
  await generateActivation(userId, days);
  sendNotification.create(
    userId,
    `FREE MEMBERSHIP 30 DAYS`,
    `Terima kasih atas kepercayaan terhadap Comika Media. silahkan menikmati uji coba akses konten premium comika media selama 30 hari.`,
    "https://api.comika.media/uploads/comika/settlement.png",
    null,
    "informasi"
  );
};

const bodyWelcoming = (name) => {
  return `<h4> Selamat datang, ${name}!</h4>
  <p style="text-align: justify;">
    &emsp;&emsp;&emsp;Terima kasih sudah mau mendaftarkan email untuk jadi pembaca Comikamedia! Tenang, kami tidak akan gadaikan email kamu untuk jadi database pinjol. Dengan login, kamu akan dapat banyak keuntungan: mulai dari bisa menumpahkan opini lewat kolom komentar, hingga berbagi artikel di media sosial dengan tambahan emoji api-api. Mau simpan artikel untuk dibaca ketika capek dikirimi stiker jayus di grup WhatsApp juga bisa.
    <br>
    <br>
    &emsp;&emsp;&emsp;Setiap harinya akan ada artikel berisi informasi komedi terbaru. Namun, akses lebih luas bisa kamu dapatkan dengan cara berlangganan. Demi reportase yang lebih mendalam, reporter kami mempertaruhkan kesehatan mata dengan riset berjam-jam dari laptop, membelah jalanan untuk mewartakan fenomena komedi dengan lebih dekat, hingga sok asik kepada komika demi mengorek informasi orang dalam. Kalau kamu cinta komedi, harga berlangganan Comikamedia tak lebih mahal dari beli saham, tapi bisa jadi investasi!
    <br>
    <br>
    &emsp;&emsp;&emsp;Akhir kata, direktur kami Pandji Pragiwaksono punya cita-cita: "Comika didirikan agar komika bisa hidup dari karya." Itulah mengapa beliau juga mendirikan Comikamedia, karena reporter kami semua komika. Hanya saja (untuk saat ini) kami lebih jago mewartakan komedi ketimbang berkomedinya.
  </p>
Cheers,
<br>
Redaksi Comikamedia
`;
};

module.exports = { service };

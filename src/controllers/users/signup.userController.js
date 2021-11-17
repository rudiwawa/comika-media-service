const { User } = require("../../models");
const { body } = require("express-validator");
const sendEmail = require("../../services/sendEmail");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const requestDB = await User.create(payload);
    sendEmail({ to: req.body.email, body: bodyWelcoming(req.body.name) });
    res.response = { msg: "akun berhasil didaftarkan", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const bodyWelcoming = (name) => {
  return `<h4>
  Selamat datang, ${name}!
</h4>
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
const validation = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("email", "email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("email tidak valid")
    .custom(async (value) => {
      const user = await User.findOne({
        where: { email: value },
      });
      if (user) {
        return Promise.reject("E-mail already in use");
      } else {
        return true;
      }
    }),
  body("password", "password tidak boleh kosong").notEmpty(),
];
module.exports = { service, validation };

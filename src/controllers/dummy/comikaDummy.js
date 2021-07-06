const { Comika } = require("../../models");

const service = async function (req, res, next) {
  try {
    Comika.bulkCreate([
      {
        id: 1,
        name: "Pandji Pragiwaksono",
        photo: "https://pbs.twimg.com/profile_images/1341056153468354574/kcfQnHeI_400x400.jpg",
        verified: true,
      },
      {
        id: 2,
        name: "Raditya Dika",
        photo:
          "https://www.herworld.co.id/gallery/teaser/Tips-Memanfaatkan-Sosial-Media-ala-Raditya-Dika_51_20190913105500.jpg",
        verified: true,
      },
      {
        id: 3,
        name: "Nopek Novian",
        photo:
          "https://1.bp.blogspot.com/-wKtYZb9xIPM/Wda5vFlGMYI/AAAAAAAAOCk/aSNmrWIl1FQ0LX2r2rObloVe0n_vPSc2gCLcBGAs/s1600/nopek.jpg",
        verified: false,
      },
      {
        id: 4,
        name: "Ali Akbar",
        photo: "https://i2.wp.com/ytimg.googleusercontent.com/vi/ZiOioNt9Ox0/hqdefault.jpg",
        verified: false,
      },
    ]);
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
};

module.exports = { service };

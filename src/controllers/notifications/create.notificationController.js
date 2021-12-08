const { Notification, Product } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { body } = require("express-validator");
const moment = require("moment");

const service = async function (req, res, next) {
  try {
    let masterNotification = null;
    let img = null;
    if (req.body.type == "promo") {
      img = "https://api.comika.media/uploads/comika/discount.png";
      masterNotification = await Product.scope("promo").findOne({ where: { id: req.body.masterNotifId } });
    }
    if (!masterNotification) res.response = { status: 404, msg: `data ${req.body.type} tidak ditemukan` };
    else {
      masterNotification = masterNotification.dataValues;
      let listNotification = req.body.usersId.map((userId) => {
        return {
          id: uuidv4(),
          title: masterNotification.name.toUpperCase(),
          img: masterNotification.images[0].source.url || "https://api.comika.media/uploads/comika/icon.png",
          description: masterNotification.description
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/  /gi, "")
            .replace(/\n/gi, "")
            .substring(0, 120),
          descriptionHtml: masterNotification.description.replace(/  /gi, "").replace(/\n/gi, ""),
          userId: userId,
          isRead: false,
          type: req.body.type,
        };
      });
      const requestDB = await Notification.bulkCreate(listNotification, { returning: true });
      res.response = { msg: "notif berhasil ditambahkan", data: requestDB };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("masterNotifId", "master notifikasi tidak boleh kosong").notEmpty(),
  body("type", "tipe tidak boleh kosong")
    .notEmpty()
    .isIn(["promo", "informasi"])
    .withMessage("tipe notifikasi tidak sesuai"),
  body("usersId", " user tidak boleh kosong").notEmpty().isLength({ min: 1 }),
];

module.exports = { service, validation };

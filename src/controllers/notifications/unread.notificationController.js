const { Notification, Sequelize } = require("../../models");
const service = async function (req, res, next) {
  try {
    const unreadNotification = await Notification.findAll({
      where: { userId: req.auth.id, isRead: false },
    });
    let unreadTransaksi = 0;
    let unreadInformasi = 0;
    unreadNotification.map((notif) => {
      if (notif.type == "transaksi") {
        unreadTransaksi++;
      } else {
        unreadInformasi++;
      }
    });
    res.response = { data: { unreadAll: unreadNotification.length, unreadInformasi, unreadTransaksi } };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

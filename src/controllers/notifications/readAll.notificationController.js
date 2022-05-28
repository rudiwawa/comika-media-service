const { orderBy } = require('lodash');
const { Notification, Order, OrderDetails } = require('../../models');

const service = async function (req, res, next) {
  try {
    if (req.body.ids.length > 0) {
      const where = { id: req.body.ids };
      const requestDB = await Notification.update({ isRead: true }, { where });
      res.response = { data: requestDB };
    } else {
      res.response = { status: 404, msg: 'notifikasi tidak ditemukan' };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

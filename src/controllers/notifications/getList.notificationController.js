const {
  Notification,
  Sequelize: { Op },
} = require('../../models');

const service = async function (req, res, next) {
  try {
    let limit = 10;
    let offset = 0;
    let order = [['createdAt', 'DESC']];
    const where = { userId: req.auth.id };
    if (req.query.type == 'transaksi') {
      where.type = req.query.type;
    }
    if (req.query.type == 'komentar') {
      where.type = req.query.type;
    }

    if (!['transaksi', 'komentar'].includes(req.query.type)) {
      where[Op.or] = [
        { type: 'informasi' },
        { type: 'promo' },
        { type: 'komentar' },
      ];
    }
    if (req.query.limit && req.query.limit > 0) {
      limit = Number(req.query.limit);
    }
    if (req.query.page && req.query.page > 0) {
      offset = Number(req.query.page - 1) * limit;
    }
    const requestDB = await Notification.findAll({
      attributes: [
        'id',
        'img',
        'title',
        'isRead',
        'createdAt',
        'type',
        'typeIcon',
        'description',
        'link',
      ],
      where,
      order,
      limit,
      offset,
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

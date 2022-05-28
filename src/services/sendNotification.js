const { Notification } = require('../models');

const create = async function (userId, title, description, img, orderId, type) {
  try {
    type = type ? type : 'transaksi';
    const payload = {
      title,
      description: description
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/  /gi, '')
        .replace(/\n/gi, '')
        .substring(0, 120),
      descriptionHtml: description.replace(/  /gi, '').replace(/\n/gi, ''),
      userId,
      type,
      img: img || 'https://api.comika.media/uploads/comika/checkout.png',
      orderId,
    };
    const createNotif = await Notification.create(payload);
    // update link notification with id notif
    const where = {};
    if (createNotif.type === 'transaksi') {
      where = {
        orderId,
      };
    } else {
      where = {
        id: createNotif.id,
      };
    }
    await Order.update(
      {
        link: `https://comika.media/notification/${createNotif.id}`,
      },
      {
        where,
      }
    );

    return createNotif;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const bulkCreate = async function (
  listUserId,
  title,
  description,
  img,
  orderId,
  type,
  link
) {
  try {
    const payload = {
      title,
      description: description
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/  /gi, '')
        .replace(/\n/gi, '')
        .substring(0, 120),
      descriptionHtml: description.replace(/  /gi, '').replace(/\n/gi, ''),
      type: type || 'transaksi',
      img: img || 'https://api.comika.media/uploads/comika/checkout.png',
      orderId,
      link,
    };
    const payloads = listUserId.map((userId) => ({
      ...payload,
      userId,
    }));
    return await Notification.bulkCreate(payloads);
  } catch (error) {
    throw new Error(error.toString());
  }
};

module.exports = { create, bulkCreate };

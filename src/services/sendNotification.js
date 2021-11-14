const { Notification } = require("../models");

const create = async function (userId, title, description, img, orderId) {
  try {
    const payload = {
      title,
      description: description
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/  /gi, "")
        .replace(/\n/gi, "")
        .substring(0, 120),
      descriptionHtml: description.replace(/  /gi, "").replace(/\n/gi, ""),
      userId,
      type: "transaksi",
      img: img || "https://api.comika.media/uploads/comika/checkout.png",
      orderId,
    };
    return await Notification.create(payload);
  } catch (error) {
    throw new Error(error.toString());
  }
};

module.exports = { create };

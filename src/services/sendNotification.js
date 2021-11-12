const { Notification } = require("../models");

const create = async function (userId, title, description, type, orderId) {
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
      img: null,
      orderId,
    };
    switch (type) {
      case "store":
        payload.img = "https://api.comika.media/uploads/comika/surprice.jpeg";
        break;
      case "subscription":
        break;
      default:
        payload.img = "https://api.comika.media/uploads/comika/icon.png";
        break;
    }
    return await Notification.create(payload);
  } catch (error) {
    throw new Error(error.toString());
  }
};

module.exports = { create };

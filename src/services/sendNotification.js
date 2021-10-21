const { Notification } = require("../models");

const create = async function (userId, title, description, type) {
  try {
    const payload = {
      title,
      description: description
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/  /gi, "")
        .replace(/\n/gi, "")
        .substring(0, 100),
      descriptionHtml: description.replace(/  /gi, "").replace(/\n/gi, ""),
      userId,
      img: null,
    };
    switch (type) {
      case "subscribe":
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

const { Subscription } = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const service = async function (req, res, next) {
  try {
    const plan = "yearly";
    let payload = [];
    switch (plan) {
      case "yearly":
        payload = setAvalaibleOn(req.auth.id, 365);
        break;
      case "monthly":
        payload = setAvalaibleOn(req.auth.id, 30);
        break;
      case "weekly":
        payload = setAvalaibleOn(req.auth.id, 7);
        break;
      default:
        payload = setAvalaibleOn(req.auth.id, 0);
        break;
    }
    const requestDB = await Subscription.bulkCreate(payload);
    res.response = { msg: `${plan} plan berhasil diaktifkan`, data: requestDB };
  } catch (error) {
    res.response = { status: error.httpStatusCode, msg: error.ApiResponse };
  }
  next();
};

const setAvalaibleOn = (userId, day = 0) => {
  const setPayload = [];
  for (let index = 0; index < day; index++) {
    setPayload.push({
      id: uuidv4(),
      userId,
      availableOn: moment().add(index, "days"),
    });
  }
  return setPayload;
};

module.exports = { service };

const { Record } = require("../models");
const lastFunction = function (req, res) {
  try {
    const data = res.response;
    if (req.method == "GET" && !data.msg) {
      if (!data.etc) res.status(data.status || 200).json(data.data);
      else res.status(data.status || 200).json({ ...data.etc });
    } else {
      res
        .status(data.status || 200)
        .json({ msg: data.msg, ...data.etc, data: data.data });
    }
    req.record.status = data.status ?? 200;
    req.record.msg = data.msg;
    Record.create(req.record);
  } catch (error) {
    req.record.status = 400;
    req.record.msg = error.message;
    Record.create(req.record);
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = lastFunction;

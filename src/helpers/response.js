const { Record } = require("../models");
const lastFunction = function (req, res) {
  try {
    if (!res.response) res.response = { status: 404, msg: "URL API NOT FOUND" };
    const response = res.response;
    req.record.status = response.status || 200;
    req.record.msg = req.record.msg || response.msg;
    // Record.create(req.record);

    if (req.method == "GET" && !response.msg) {
      if (!response.etc) return res.status(response.status || 200).json(response.data);
      else return res.status(response.status || 200).json({ ...response.etc });
    } else {
      if (!response.msg) response.msg = "success";
      return res
        .status(response.status || 200)
        .json({ msg: response.msg || "FAILED", ...response.etc, data: response.data });
    }
  } catch (error) {
    req.record.status = 400;
    req.record.msg = error.message;
    Record.create(req.record);
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = lastFunction;

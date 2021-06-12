const lastFunction = function (
  { method, response: { status, msg, data, etc } },
  res
) {
  if (method == "GET" && !msg) return res.status(status || 200).json(data);
  
  return res.status(status || 200).json({ msg, ...etc, data });
};

module.exports = lastFunction;

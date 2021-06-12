const response = function ({ response }, res) {
  const message = { msg: response.msg };
  if (response.data) message.data = response.data;
  return res.status(response.status || 200).send(message);
};

module.exports = response;

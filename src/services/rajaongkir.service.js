const axios = require("axios");
const { setRupiah } = require("../helpers/currency");
const moment = require("moment");
exports.province = async ({ id }) => {
  try {
    const where = {};
    if (id) where.id = id;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://pro.rajaongkir.com/api/province`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};

exports.city = async ({ id, province }) => {
  try {
    const where = {};
    if (id) where.id = id;
    if (province) where.province = province;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://pro.rajaongkir.com/api/city`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};

exports.subdistrict = async ({ id, city }) => {
  try {
    const where = {};
    if (city) where.city = city;
    if (id) where.id = id;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://pro.rajaongkir.com/api/subdistrict`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};

exports.estimateCost = async (payload) => {
  try {
    payload = {
      ...payload,
      origin: "152",
      originType: "city",
      destinationType: "subdistrict",
      courier: "jne:pos:tiki",
    };
    const {
      data: { rajaongkir },
    } = await axios.post(`https://pro.rajaongkir.com/api/cost`, payload, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
    });
    return formatCostResponse(rajaongkir.results);
  } catch (error) {
    return error.message;
  }
};

const formatCostResponse = (data) => {
  let listEstimate = [];
  let idx = 0;
  data.forEach((ekspedisi) => {
    ekspedisi.costs.map((item) => {
      const dataEstimate = {
        id: idx,
        service: ekspedisi.code.toUpperCase() + " " + item.service,
        description: item.description,
        cost: item.cost[0].value,
        rupiah: setRupiah(item.cost[0].value),
        estDay: item.cost[0].etd,
        estDate: estimateDate(item.cost[0].etd),
        note: item.cost[0].note,
      };
      listEstimate.push(dataEstimate);
      idx++;
    });
  });
  return listEstimate;
};

const estimateDate = (estDay) => {
  const estimate = estDay.split("-");
  const startDate = moment().add(estimate[0], "days").format("DD MMMM");
  const endDate = moment().add(estimate[1], "days").format("DD MMMM");
  return startDate + " - " + endDate;
};

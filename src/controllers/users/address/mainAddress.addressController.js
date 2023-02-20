const {
  Address,
  sequelize,
  Sequelize: { Op },
} = require("../../../models");
const service = async function (req, res, next) {
  const t = await sequelize.transaction();
  try {
    const dropActive = await Address.update(
      { active: false },
      {
        where: {
          userId: req.auth.id,
          id: { [Op.ne]: req.params.id },
        },
      },
      { transaction: t }
    );
    const setActive = await Address.update(
      { active: true },
      {
        where: {
          userId: req.auth.id,
          id: req.params.id,
        },
      },
      { transaction: t }
    );
    await t.commit();
    res.response = { msg: "alamat dijadikan sebagai alamat utama" };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
    await t.rollback();
  }
  next();
};

module.exports = { service };

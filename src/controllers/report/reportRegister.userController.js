const {
  User,
  sequelize,
  Sequelize: { QueryTypes },
} = require("../../models");
const moment = require("moment");

const service = async (req, res, next) => {
  // count user register everyday
  let start = moment("01", "DD").format("YYYY-MM-DD");
  let end = moment("01", "DD").add(1, "months").format("YYYY-MM-DD");
  if (req.query.start && req.query.end) {
    start = moment(req.query.start).format("YYYY-MM-DD");
    end = moment(req.query.end).format("YYYY-MM-DD");
  }
  try {
    const request = await sequelize.query(
      `
    SELECT date, count(id) as active FROM (SELECT
        date_format(created_at, '%Y-%m-%d') AS date,id
    FROM
        users AS User
    WHERE
        (User.deleted_at IS NULL
            AND (User.created_at >= '${start}'
                AND User.created_at < '${end}'))
    ORDER BY
        User.created_at ASC) tbl GROUP BY date`,
      { type: QueryTypes.SELECT }
    );
    res.response = { data: request };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };

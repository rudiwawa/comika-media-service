const { Like } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const where = {
      articleId: req.article.id,
      userId: req.auth.id,
    };

    const [like, created] = await Like.findOrCreate({ where });
    if (created) {
      res.response = { status: 200, msg: req.article.title + " berhasil disukai" };
    } else {
      const deleted = await Like.destroy({ where });
      if (deleted) res.response = { status: 201, msg: req.article.title + " batal disukai" };
      else res.response = { status: 400, msg: req.article.title + " gagal batal disukai" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }

  next();
};

module.exports = { service };

const { Bookmark } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const where = {
      articleId: req.article.id,
      userId: req.auth.id,
    };

    const [bookmark, created] = await Bookmark.findOrCreate({ where });
    if (created) {
      res.response = { status: 200, msg: req.article.title + " ditambahkan ke bookmarks" };
    } else {
      const deleted = await Bookmark.destroy({ where });
      if (deleted) res.response = { status: 201, msg: req.article.title + " dihapus dari bookmarks" };
      else res.response = { status: 400, msg: req.article.title + " gagal dihapus dari bookmarks" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }

  next();
};

module.exports = { service };

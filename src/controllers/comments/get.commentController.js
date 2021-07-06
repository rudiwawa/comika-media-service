const { Comment, User } = require("../../models");

const service = async function (req, res, next) {
  try {
    const articleId = req.article.id;
    const requestDB = await Comment.findAll({
      attributes: ["id", "comment", "createdAt"],
      where: { articleId },
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        attributes: ["id", "name", "photo"],
      },
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
module.exports = { service };

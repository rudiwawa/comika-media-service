const { Comment, User } = require('../../models');

const service = async function (req, res, next) {
  try {
    const articleId = req.article.id;
    const requestDB = await Comment.findAll({
      attributes: ['id', 'comment', 'createdAt'],
      where: { articleId, commentId: null },
      order: [
        ['createdAt', 'desc'],
        [{ model: Comment, as: 'replies' }, 'createdAt', 'asc'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'photo'],
        },
        {
          model: Comment,
          as: 'replies',
          attributes: ['id', 'comment', 'createdAt'],
          include: {
            model: User,
            attributes: ['id', 'name', 'photo'],
          },
        },
      ],
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
module.exports = { service };

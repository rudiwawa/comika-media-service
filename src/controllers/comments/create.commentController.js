const {
  Comment,
  Article,
  User,
  Sequelize: { Op },
} = require('../../models');
const { body } = require('express-validator');
const sendNotification = require('../../services/sendNotification');
const service = async function (req, res, next) {
  try {
    const payload = {
      articleId: req.article.id,
      userId: req.auth.id,
      comment: req.body.comment,
      commentId: null,
    };
    if (req.body.commentId) {
      payload.commentId = await parentComment(
        req.body.commentId,
        req.article.id
      );
    }
    const requestDB = await Comment.create(payload);
    res.response = { data: requestDB };
    await broadcastNotification(
      req.auth.name,
      payload.comment,
      req.article,
      payload.commentId,
      payload.userId
    );
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const parentComment = async (commentId, articleId) => {
  const comment = await Comment.findOne({
    where: {
      id: commentId,
      articleId,
    },
  });
  if (!comment) {
    return null;
  }
  if (comment.commentId) {
    return parentComment(comment.commentId, articleId);
  }
  return comment.id;
};

const validation = [
  body('comment')
    .notEmpty()
    .withMessage('komentar tidak boleh kosong')
];
const broadcastNotification = async (
  name,
  comment,
  article,
  commentId,
  userParentCommentId
) => {
  // paralel get list user id admin and writer
  const requestUser = await Promise.all([
    getListUserIdAdminAndWriter(userParentCommentId),
    getListUserInComment(commentId, userParentCommentId),
  ]);
  let listUserNotAdminAndWriter = [];
  const listAdmin = requestUser[0];
  // get list user id who not in list user id admin and writer
  if (commentId) {
    const listUser = requestUser[1];
    if (listUser)
      listUserNotAdminAndWriter = listUser.filter(
        (user) => !listAdmin.includes(user.id)
      );
  }
  const listUserReceiveNotification = [
    ...listUserNotAdminAndWriter,
    ...listAdmin,
  ];
  // send notification to list user id
  sendNotification.bulkCreate(
    listUserReceiveNotification,
    `${name} melakukan komentar di artikel ${article.title}`,
    `${name} said "${comment}"`,
    'https://api.comika.media/uploads/comika/icon.png',
    null,
    'komentar',
    `https://comika.media/posts/${article.slug}`
  );
};
const getListUserInComment = async (commentId, userParentCommentId) => {
  if (!commentId) return [];
  const comments = await Comment.findAll({
    attributes: ['userId'],
    where: {
      commentId,
      userId: {
        [Op.ne]: userParentCommentId,
      },
    },
  });
  return comments.map((item) => item.userId);
};

const getListUserIdAdminAndWriter = async (userParentCommentId) => {
  const admin = await User.findAll({
    attributes: ['id'],
    where: {
      [Op.or]: [
        {
          role: 'admin',
        },
        {
          role: 'writer',
        },
      ],
      id: {
        [Op.ne]: userParentCommentId,
      },
    },
  });
  return admin.map((item) => item.id);
};
module.exports = { service, validation };

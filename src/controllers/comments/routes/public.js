const express = require('express');
const router = express.Router();
const slugArticle = require('../../../middlewares/slugArticle');
const { checkToken } = require('../../../middlewares/jwtUser');
const validator = require('../../../helpers/validator');
const getCommentController = require('../get.commentController');
const createCommentController = require('../create.commentController');

router
  .get('/:slug', slugArticle, getCommentController.service)
  .post(
    '/:slug',
    createCommentController.validation,
    validator,
    checkToken,
    slugArticle,
    createCommentController.service
  );

module.exports = router;

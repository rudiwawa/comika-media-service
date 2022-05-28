const express = require('express');
const router = express.Router();
const createNotification = require('../create.notificationController');
const getListNotification = require('../getList.notificationController');
const getDetailNotification = require('../getDetail.notificationController');
const readAllNotification = require('../readAll.notificationController');
const validator = require('../../../helpers/validator');
const { checkToken } = require('../../../middlewares/jwtAdmin');
router.use(checkToken);
router.post(
  '/',
  createNotification.validation,
  validator,
  createNotification.service
);
router.get('/', getListNotification.service);
router.get('/:id', getDetailNotification.service);
router.post('/read-all', readAllNotification.service);
module.exports = router;

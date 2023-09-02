const router = require('express').Router();
const NotFoundError = require('../Errors/NotFoundError');

const sendAllert = () => {
  throw new NotFoundError('Неверный путь');
};

router.use('/', sendAllert);

module.exports = router;

// const { isCelebrateError } = require('celebrate');
const { SERVER_ERROR } = require('../utils/errorCodes');

const sendError = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  // if (isCelebrateError(err)) {
  //   res.status(400).send({ message: 'Данные не прошли валидацию' }).end();
  // }
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  }).end();
  next();
};

module.exports = sendError;

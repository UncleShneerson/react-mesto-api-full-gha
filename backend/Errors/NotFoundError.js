const { NOT_FOUND } = require('../utils/errorCodes');

class NotFoundError extends Error {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'Данные не найдены';
    }
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;

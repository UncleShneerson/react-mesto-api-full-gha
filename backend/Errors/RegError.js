const { REG_ERROR } = require('../utils/errorCodes');

class RegError extends Error {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'Пользователь с данным email уже существует';
    }
    this.name = 'RegistrationError';
    this.statusCode = REG_ERROR;
  }
}

module.exports = RegError;

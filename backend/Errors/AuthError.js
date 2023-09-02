const { AUTH_ERROR } = require('../utils/errorCodes');

class AuthError extends Error {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'Неверные логин или пароль';
    }
    this.name = 'AuthentificationError';
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = AuthError;

const { VALIDATION_ERROR } = require('../utils/errorCodes');

class ValidationError extends Error {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'Одно или несколько полей не прошли валидацию';
    }
    this.name = 'ValidationError';
    this.statusCode = VALIDATION_ERROR;
  }
}

module.exports = ValidationError;

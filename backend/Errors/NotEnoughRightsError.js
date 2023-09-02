const { RIGHT_ERROR } = require('../utils/errorCodes');

class NotEnoughRightsError extends Error {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'У вас недостаточно прав';
    }
    this.name = 'NotEnoughRightsError';
    this.statusCode = RIGHT_ERROR;
  }
}

module.exports = NotEnoughRightsError;

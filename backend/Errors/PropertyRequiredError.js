const ValidationError = require('./ValidationError');

class PropertyRequiredError extends ValidationError {
  constructor(message) {
    super();
    if (message) {
      this.message = message;
    } else {
      this.message = 'Одно или несколько значений не переданы';
    }
    this.name = 'PropertyRequiredError';
  }
}

module.exports = PropertyRequiredError;

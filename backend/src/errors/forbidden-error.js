const { FORBIDDEN_STATUS } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS;
  }
}

module.exports = ForbiddenError;

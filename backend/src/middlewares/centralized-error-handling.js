const { INTERNAL_SERVER_ERROR_STATUS, SERVER_ERROR_TEXT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR_STATUS ? SERVER_ERROR_TEXT : message,
  });

  next();
};

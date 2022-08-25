const jwt = require('jsonwebtoken');

const { JWT_SECRET, CREATED_STATUS } = require('./constants');

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};

module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: '7d',
});

module.exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { AUTHORIZATION_FAILED_TEXT } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return validator.isURL(avatar);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function checkEmailAndPassWord(email, password) {
  const user = await this.findOne({ email }).orFail(() => {
    throw new UnauthorizedError(AUTHORIZATION_FAILED_TEXT);
  }).select('+password');

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError(AUTHORIZATION_FAILED_TEXT);
  }

  return user;
};

module.exports.User = mongoose.model('user', userSchema);

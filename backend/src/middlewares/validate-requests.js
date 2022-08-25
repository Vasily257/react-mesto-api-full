const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const linkRegex = /https?:\/\/(www\.)?([a-z0-9\-\.])+(\.\w*)([\w\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=])*/i;

const userNameRules = Joi.string().min(2).max(30);
const aboutRules = Joi.string().min(2).max(30);
const avatarRules = Joi.string().regex(linkRegex);
const emailRules = Joi.string().required().email();
const passwordRules = Joi.string().required();

const cardNameRules = Joi.string().required().min(2).max(30);
const linkRules = Joi.string().required().regex(linkRegex);

const idRules = Joi.string().alphanum().length(24);

// User data validation

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    about: aboutRules,
    avatar: avatarRules,
    email: emailRules,
    password: passwordRules,
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    about: aboutRules,
  }),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarRules,
  }),
});

// Cards data validation

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    name: cardNameRules,
    link: linkRules,
  }),
});

// General data validation

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: idRules,
  }),
});

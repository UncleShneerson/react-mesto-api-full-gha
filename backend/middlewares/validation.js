const { Joi, celebrate } = require('celebrate');

const regexURL = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%/&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/;
const regexEmail = /[\w-]{1,20}@[a-z0-9-]{1,20}\.{1}[a-z0-9-]*/;

// Валидация авторизации
const signUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(regexEmail).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexURL),
  }),
});

const logInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(regexEmail).required(),
    password: Joi.string().min(6).required(),
  }),
});

// Валидация пользователей
const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUpdateValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexURL).required(),
  }),
});

// Валидация карточек
const cardCreateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regexURL).required(),
  }),
});

// Валидация ID
const IdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  signUpValidate,
  logInValidate,
  userUpdateValidate,
  avatarUpdateValidate,
  cardCreateValidate,
  IdValidate,
};

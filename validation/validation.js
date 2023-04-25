const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/constants/regExp');

const validationLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationAuthorization = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Данное поле обязательное',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Данное поле обязательное',
    }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24)
      .pattern(/[a-z][0-9]+/),
  }),
});

const updateProfileUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExp),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regExp),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  userIdValidation,
  updateProfileUserValidation,
  updateAvatarValidation,
  createCardValidation,
  cardIdValidation,
  validationLogin,
  validationAuthorization,
};

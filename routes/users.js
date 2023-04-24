const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regExp } = require('../utils/constants/regExp');
const {
  getUserById, getUserProfile, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExp),
  }),
}), updateUserAvatar);

module.exports = usersRouter;

const usersRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUserById, getUserProfile, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;

const usersRouter = require('express').Router();
const {
  login, getUser, getAllUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;

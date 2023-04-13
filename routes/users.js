const usersRouter = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);
module.exports = usersRouter;

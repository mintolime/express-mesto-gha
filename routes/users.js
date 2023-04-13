const { getUser, getAllUsers, createUser,updateUserProfile,updateUserAvatar } = require('../controllers/users');

const usersRouter = require('express').Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me',updateUserProfile)
usersRouter.patch('/me/avatar',updateUserAvatar)
module.exports = usersRouter;

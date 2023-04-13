const { getUser, getAllUsers, createUser } = require('../controllers/users');

const usersRouter = require('express').Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
// usersRouter.patch('/me',UpdateUserProfile)
// usersRouter.patch('/me/avatar',UpdateUserAvatar)
module.exports = usersRouter;

const { getUser, getAllUsers, createUser } = require('../controllers/users');

const usersRouter = require('express').Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
module.exports = usersRouter;

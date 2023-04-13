const { getUser,createUser } = require('../controllers/users');

const usersRouter = require('express').Router();
usersRouter.get('/:id', getUser);
usersRouter.post('/',createUser)
module.exports = usersRouter; 
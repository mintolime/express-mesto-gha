const { createUser } = require('../controllers/users');

const usersRouter = require('express').Router();
usersRouter.post('/',createUser)
module.exports = usersRouter; 
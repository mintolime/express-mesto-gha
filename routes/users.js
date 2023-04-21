const usersRouter = require('express').Router();
const {
  login, getUserById, getUserProfile, getAllUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.use(auth);
usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;

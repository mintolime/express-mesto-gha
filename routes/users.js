const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login, getUserById, getUserProfile, getAllUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

usersRouter.post('/signin', login);
usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
usersRouter.use(auth);
usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;

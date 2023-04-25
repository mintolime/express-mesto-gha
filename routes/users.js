const usersRouter = require('express').Router();

const {
  getUserById, getUserProfile, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { userIdValidation, updateProfileUserValidation, updateAvatarValidation } = require('../validation/validation');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateProfileUserValidation, updateUserProfile);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = usersRouter;

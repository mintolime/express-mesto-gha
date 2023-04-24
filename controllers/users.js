const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { handleSucsessResponse } = require('../utils/handleSucsessResponse');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const BadRequest = require('../utils/errors/BadRequest');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');

// при роуте приходит токен
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'SECRET_KEY',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
      }).send({ token });
    })
    .catch((err) => {
      // возвращаем ошибку аутентификации
      console.log(err.message);
      next(new UnauthorizedError('Необходима авторизация'));
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => handleSucsessResponse(res, 201, {
      name, about, avatar, email,
    }))// при создании пользователя пароль не возвращается
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные '));
      }
      if (err.code === 11000) {
        next(new ConflictError('Данный пользователь уже создан'));
      }
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return handleSucsessResponse(res, 200, user);
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные.'));
      }
    });
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return handleSucsessResponse(res, 200, user);
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные.'));
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((card) => {
      handleSucsessResponse(res, 200, card);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return handleSucsessResponse(res, 200, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные.'));
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const ownerId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(ownerId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return handleSucsessResponse(res, 200, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
    });
};

module.exports = {
  login, createUser, getUserById, getUserProfile, getAllUsers, updateUserProfile, updateUserAvatar,
};

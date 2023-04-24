const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED_ERROR,
} = require('../utils/errors');
// при роуте приходит токен
const login = (req, res) => {
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
      res
        .status(UNAUTHORIZED_ERROR)
        .send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.send({
        name, about, avatar, email,
      }); // при создании пользователя пароль не возвращается
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      if (err.code === 11000) {
        res.status(401)
          .send({ message: 'Данный пользователь уже создан' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя.' });
      }
      return res.status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

// id прилетает из функции, но там не прилетает тот id , который приходит с авторизацией
const getUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя.' });
      }
      return res.status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' }));
};

const updateUserProfile = (req, res) => {
  const ownerId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({ message: ' Пользователь с указанным _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные при обновлении профиля. ' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const ownerId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(ownerId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({ message: ' Пользователь с указанным _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST)
          .send({ message: ' Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  login, createUser, getUserById, getUserProfile, getAllUsers, updateUserProfile, updateUserAvatar,
};

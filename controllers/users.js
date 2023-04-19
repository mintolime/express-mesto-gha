const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errors');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const getUser = (req, res) => {
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
  createUser, getUser, getAllUsers, updateUserProfile, updateUserAvatar,
};

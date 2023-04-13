const user = require('../models/user');
const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log(req.body);
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log('error:', err);
      res.status(400).send(err);
    });
  console.log(req.body);
};

const getAllUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  console.log(req.body);
};

const updateUserProfile = (req, res) => {
  const  userId  = req.user._id;
  const { name, about } = req.body;
  console.log(req.user._id)
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateUserAvatar = (req, res) => {
  const  userId  = req.user._id;
  const { link } = req.body;

  User.findByIdAndUpdate(userId, { link }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = { createUser, getUser, getAllUsers, updateUserProfile,updateUserAvatar };

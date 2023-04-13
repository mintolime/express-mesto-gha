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
  const { userId } = req.params;
  console.log(userId )
  User.findById(userId )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log('error:', err);
      res.status(400).send(err);
    });
  console.log(req.body);
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  console.log(req.body);
};

const updateUserProfile = (req, res) => {
  const  ownerId  = req.user._id;
  const { name, about } = req.body;
  console.log(req.user._id)
  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateUserAvatar = (req, res) => {
  const  ownerId  = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(ownerId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = { createUser, getUser, getAllUsers, updateUserProfile,updateUserAvatar };

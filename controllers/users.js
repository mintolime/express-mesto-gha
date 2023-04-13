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
  User.findById(userId)
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

module.exports = { createUser, getUser, getAllUsers };

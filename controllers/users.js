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
  const { id } = req.user;
  console.log(req.user)
};

module.exports = { createUser, getUser };

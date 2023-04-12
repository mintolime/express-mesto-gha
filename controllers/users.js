const User = require('../models/user');

const createUser = (req, res) => {
  const { name, email } = req.body;
  User.create({ name, email })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log(req.body);
};


module.exports = { createUser };

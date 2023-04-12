const Card = require('../models/card');

const createCard = (req, res) => {
  // const { name, link } = req.body;
  // Card.create({ name, link })
  //   .then((newCard) => {
  //     res.send(newCard);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
  console.log(req.body);
};

module.exports = { createCard };

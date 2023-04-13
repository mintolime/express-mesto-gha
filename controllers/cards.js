const Card = require('../models/card');

const createCard = (req, res) => {
  const { id } = req.user;
  const { name, link } = req.body;
  Card.create({
    link,
    name,
    owner: id,
  })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log(req.body);
};

const getCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
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

const getAllCard = (req, res) =>{
 Card.find({})
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(`Не найдено ${err}`);
      res.status(400).send(err);
    });
}

module.exports = { createCard, getAllCard, getCard };

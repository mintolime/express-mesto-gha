const Card = require('../models/card');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
      console.log(newCard);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log(req.body);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  console.log(req.params);
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  console.log(req.body);
};

const getAllCard = (req, res) => {
  Card.find({})
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(`Не найдено ${err}`);
      res.status(400).send(err);
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  );
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  );
};

module.exports = { createCard, getAllCard, deleteCard, likeCard, dislikeCard };

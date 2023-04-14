const Card = require('../models/card');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errors');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка,попробуйте ещё раз' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findOneAndDelete({ _id: cardId })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для удаления карточки',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка,попробуйте ещё раз' });
    });
};

const getAllCard = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка,попробуйте ещё раз' }));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки лайка',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка,попробуйте ещё раз' });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для удаления лайка',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка,попробуйте ещё раз' });
    });
};

module.exports = {
  createCard, getAllCard, deleteCard, likeCard, dislikeCard,
};

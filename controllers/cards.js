const Card = require('../models/card');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errors');
const { handleSucsessResponse } = require('../utils/handleSucsessResponse');

// const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const BadRequest = require('../utils/errors/BadRequest');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => handleSucsessResponse(res, 201, newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные '));
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  // ошибку выдает, но все же удаляет карточку
  Card.findOneAndDelete({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } if (card.owner.id !== req.user._id) {
        throw new ForbiddenError('Чужую карточку удалить нельзя'); // карточку удаляет , хоть и получает ошибку
      }
      return handleSucsessResponse(res, 200, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные '));
      }
    });
};

const getAllCard = (req, res, next) => {
  Card.find({})
    .then((card) => {
      handleSucsessResponse(res, 200, card);
    })
    .catch(next);
};

// здесь можно сделать универсальную функцию
const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return handleSucsessResponse(res, 200, card);
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

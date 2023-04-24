const Card = require('../models/card');
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

const updateLike = (req, res, method, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { [method]: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      return handleSucsessResponse(res, 200, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные '));
      }
    });
};

const likeCard = (req, res, next) => updateLike(req, res, '$addToSet', next);
const dislikeCard = (req, res, next) => updateLike(req, res, '$pull', next);

module.exports = {
  createCard, getAllCard, deleteCard, likeCard, dislikeCard,
};

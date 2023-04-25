const cardsRouter = require('express').Router();
const {
  createCard,
  getAllCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardIdValidation, createCardValidation } = require('../validation/validation');

cardsRouter.get('/', getAllCard);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRouter;

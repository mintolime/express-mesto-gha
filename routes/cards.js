const cardsRouter = require('express').Router();
const {
  createCard,
  getAllCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCard);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;

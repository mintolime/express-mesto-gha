const { createCard,getAllCard,getCard } = require('../controllers/cards');

const cardsRouter = require('express').Router();
cardsRouter.get('/', getAllCard);
cardsRouter.get('/:cardId', getCard);
cardsRouter.post('/', createCard);
// cardsRouter.put('/:cardId/likes', likeCard);
// cardsRouter.delete('/:cardId/likes', dislikeCard);
module.exports = cardsRouter;

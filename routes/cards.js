const { createCard,getCard } = require('../controllers/cards');

const cardsRouter = require('express').Router();
cardsRouter.get('/:id', getCard);
cardsRouter.post('/', createCard);
// cardsRouter.('/', createCard);
module.exports = cardsRouter;

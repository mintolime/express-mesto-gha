const { createCard } = require('../controllers/cards');

const cardsRouter = require('express').Router();
cardsRouter.post('/', createCard);
module.exports = cardsRouter;

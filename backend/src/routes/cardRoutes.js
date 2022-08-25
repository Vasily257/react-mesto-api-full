const express = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

const { validateId, validateCardData } = require('../middlewares/validate-requests');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCardData, createCard);
cardRoutes.delete('/:id', validateId, deleteCard);
cardRoutes.put('/:id/likes', validateId, likeCard);
cardRoutes.delete('/:id/likes', validateId, dislikeCard);

module.exports = {
  cardRoutes,
};

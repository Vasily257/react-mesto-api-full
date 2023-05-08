const express = require('express');

const { validateUserData } = require('../middlewares/validate-requests');
const { createUser, login } = require('../controllers/userControllers');

const { BASE_ALIAS } = require('../utils/constants');

const auth = require('../middlewares/auth');

const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');

const NotFoundError = require('../errors/not-found-error');

const routes = express.Router();

routes.post(`${BASE_ALIAS}/signin`, validateUserData, login);
routes.post(`${BASE_ALIAS}/signup`, validateUserData, createUser);

routes.use(auth);

routes.use(`${BASE_ALIAS}/users`, userRoutes);
routes.use(`${BASE_ALIAS}/cards`, cardRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена.'));
});

module.exports = { routes };

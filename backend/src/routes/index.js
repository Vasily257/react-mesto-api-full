const express = require('express');

const { validateUserData } = require('../middlewares/validate-requests');
const { createUser, login } = require('../controllers/userControllers');

const auth = require('../middlewares/auth');

const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');

const NotFoundError = require('../errors/not-found-error');

const routes = express.Router();

routes.post('/signin', validateUserData, login);
routes.post('/signup', validateUserData, createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена.'));
});

module.exports = { routes };

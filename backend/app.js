const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { routes } = require('./src/routes/index');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const centralizedErrorHandling = require('./src/middlewares/centralized-error-handling');
const { limiterOptions, corsOptions } = require('./src/utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

// Server protection

const limiter = rateLimit(limiterOptions);

app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet.hidePoweredBy());
app.use(requestLogger);

// Route handlers

app.use(express.json());
app.use(routes);

// Error validation

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);

// Starting the app

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
}

main();

// Global error handler

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
